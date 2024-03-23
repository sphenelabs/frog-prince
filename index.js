require('dotenv').config()
var express = require('express');
const { Web3 } = require('web3');
const Provider = require('@truffle/hdwallet-provider');

var app = express();
var port = process.env.PORT || 3000;

const SMART_CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS;
const SMART_CONTRACT_ABI = require(process.env.SMART_CONTRACT_ABI_PATH);
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

const WALLET_ADDRESS_2 = process.env.WALLET_ADDRESS_2;

const provider = new Provider(WALLET_PRIVATE_KEY, RPC_URL);
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS);

// example of calling a read method and get the return: await myContract.methods["balanceOf"](address).call();
// example of calling a read method and get the return: await myContract.methods.balanceOf(address).call();

app.get("/", async (req, res) => {
    try {
        res.json({ value: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching data from the smart contract' });
    }
});

app.get("/balanceOf", async (req, res) => {
    try {
        const data = await contract.methods.balanceOf(WALLET_ADDRESS);
        res.json({ value: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching data from the smart contract' });
    }
});

app.get("/frogs", async (req, res) => {
    try {
        const data = await contract.methods.balanceOf(WALLET_ADDRESS);
        res.json({ value: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching data from the smart contract' });
    }
});

app.post("/sendMosquitoes", async (req, res) => {
    try {
        var receipt = await contract.methods.sendMosquitoes(2, WALLET_ADDRESS_2).send({ from: address });
        res.json({ value: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching data from the smart contract' });
    }
});





app.listen(port);
console.log('listening on', port);