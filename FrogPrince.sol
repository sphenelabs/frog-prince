// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.4.1/token/ERC721/extensions/ERC721URIStorage.sol";

contract FrogPrince is ERC721URIStorage {
    uint public matchThreshold;
    uint public mintThreshold;
    uint public maxMosquitoes;

    struct Frog {
        string username;
        string hobby;
        string ethnicity;
        string gender;
        string nationality;
        uint height;
        string education;
        string occupation;
    }

    mapping(address => Frog) public frogs;
    mapping(address => mapping(address => uint)) public mosquitoBalance;
    mapping(address => mapping(address => uint)) public croaks;
    mapping(address => mapping(address => string)) public eggs;

    // Events
    event FrogRegistered(address indexed frogAddress, string username);
    event MosquitoesSent(address indexed from, address indexed to, uint number);
    event Croak(address indexed from, address indexed to);
    event TadpoleHatched(address indexed from, address indexed partner, uint256 tokenId);
    event EggLaid(address indexed from, address indexed partner, string cid);
    event FrogsMatched(address indexed from, address indexed partner);

    constructor(uint _matchThreshold, uint _mintThreshold, uint _maxMosquitoes) ERC721("FrogPrincess", "FRGPRN") {
        matchThreshold = _matchThreshold;
        mintThreshold = _mintThreshold;
        maxMosquitoes = _maxMosquitoes;
    }

    function register(
        string memory username,
        string memory hobby,
        string memory ethnicity,
        string memory gender,
        string memory nationality,
        uint height,
        string memory education,
        string memory occupation
    ) public {
        require(frogs[msg.sender].height == 0, "Frog exists!");
        frogs[msg.sender] = Frog(username, hobby, ethnicity, gender, nationality, height, education, occupation);
        emit FrogRegistered(msg.sender, username);
    }

    function sendMosquitoes(uint _number, address _to) public {
        require(frogs[_to].height != 0, "Frog does not exist.");
        require(_number <= maxMosquitoes, "Cannot send more than MAX mosquitoes.");
        require(_to != msg.sender, "Cannot send to your self!");
        mosquitoBalance[msg.sender][_to] = _number;
        emit MosquitoesSent(msg.sender, _to, _number);
        if (mosquitoBalance[msg.sender][_to] + mosquitoBalance[_to][msg.sender]>= matchThreshold) {
            emit FrogsMatched(msg.sender, _to);
        }
        emit FrogsMatched(msg.sender, _to);
    }

    function getAllMatches() public view returns (address[] memory) {
        // inefficient; for hackathon only
        // TODO remove this function and use an indexer
        uint count = 0;
        address[] memory tempMatches = new address[](256);  
        for(uint i = 0; i < 256; i++) {
            if (mosquitoBalance[msg.sender][tempMatches[i]] + mosquitoBalance[tempMatches[i]][msg.sender] > matchThreshold) {
                tempMatches[count] = tempMatches[i];
                count++;
            }
        }

        address[] memory matches = new address[](count);
        for(uint i = 0; i < count; i++) {
            matches[i] = tempMatches[i];
        }
        return matches;
    }

    function croak(address _to) public {
        require(frogs[_to].height != 0, "Frog does not exist.");
        croaks[msg.sender][_to]++;
        emit Croak(msg.sender, _to);
    }

    // TODO this function should probably be payable 
    // you have to pay to hatch an egg
    function hatchTadpole(address _partner) public {
        require(croaks[msg.sender][_partner] + croaks[_partner][msg.sender] > mintThreshold, "Mint threshold not met.");
        uint256 tokenId = uint256(keccak256(abi.encodePacked(eggs[msg.sender][_partner], msg.sender, _partner)));
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, eggs[msg.sender][_partner]);
        emit TadpoleHatched(msg.sender, _partner, tokenId);
    }

    // TODO note this function should be access controlled after the hackathon
    function layEgg(string memory cid, address _partner) public {
        eggs[msg.sender][_partner] = cid;
        emit EggLaid(msg.sender, _partner, cid);
    }

    // TODO helper function when a frog registers
    // generate potential frog egg images
    // prompt from offchain openai customgpt
    function generateEggImages(string memory _prompt, address _partner) public pure returns (string memory cid) {
        // call ORA contract (stable diffusion model)
        

        eggs[msg.sender][_partner] = cid;
        eggs[_partner][msg.sender] = cid;
        emit EggLaid(msg.sender, _partner, cid);
        return cid;
    }

}