require('dotenv').config()
var express = require('express');
const { Web3 } = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const { Client } = require('@xmtp/xmtp-js');
const { Wallet } = require('ethers');

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

// TODO: implement the register method
// app.post('/register', async (req, res) => {
//     try {
//         const data = await contract.methods.register(req.body.address, req.body.username);
//         res.json({ value: data });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Error fetching data from the smart contract' });
//     }
// });

// Use this method to send a message
// TODO should infer sender from header token, for now, just grab from request body
// app.post('/croak', async (req, res) => {

//     try {
//         // Send a message with XMTP
//         const signer = Wallet.createRandom();
//         const xmtp = await Client.create(signer, { env: "dev" });
//         // Start a conversation with XMTP
//         const conversation = await xmtp.conversations.newConversation(
//         req.body.recipientAddress,
//         );
//         // Load all messages in the conversation
//         const messages = await conversation.messages();
//         // Send a message
//         await conversation.send(req.body.message);
//         // Listen for new messages in the conversation
//         for await (const message of await conversation.streamMessages()) {
//         console.log(`[${message.senderAddress}]: ${message.content}`);
//         }
//         // Call smart contract
//         const data = await contract.methods.croak(req.body.recipientAddress).send({ from: req.body.senderAddress });
//         res.json({ value: data });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: `Error croaking!` });
//     }

// });

app.get("/balanceOfWithAddress/", async (req, res) => {
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

/**
 * req.body = {
 *   fromAddress: string,
 *   toAddress: string
 * }
 */
app.post("/sendMosquitoes", async (req, res) => {
    const { fromAddress, toAddress } = req.body;
    try {
        var receipt = await contract.methods.sendMosquitoes(1, toAddress).send({ from: fromAddress });
        res.json({ value: receipt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching data from the smart contract' });
    }
});





app.listen(port);
console.log('listening on', port);