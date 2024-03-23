require('dotenv').config()
var express = require('express');
const { Web3 } = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const { Client } = require('@xmtp/xmtp-js');
const { Wallet } = require('ethers');

var app = express();
app.use(express.json());

var port = process.env.PORT || 3000;

const SMART_CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS;
const SMART_CONTRACT_ABI = require(process.env.SMART_CONTRACT_ABI_PATH);
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

const provider = new Provider(WALLET_PRIVATE_KEY, RPC_URL);
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS);

const promptContractABIPath = "./prompt.abi.json";
const promptContractAddress = "0x64BF816c3b90861a489A8eDf3FEA277cE1Fa0E82"

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


// TODO make this more secure. We were using Circle but doesn't support Scroll nor Linea.
/**
 * Register a new frog (these are web2 users, so create a new wallet for them)
 * req.body = {
 *   frogs: list of frogs,
 *   prompt: string,
 * }
 */
app.post('/register', async (req, res) => {
    const { username, descriptor } = req.body;
    try {
        const wallet = Wallet.createRandom();
        console.log("Created wallet", wallet);
        const provider = new Provider(wallet.privateKey, RPC_URL);
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS);
        const data = await contract.methods.register(username, descriptor).send({ from: wallet.address });
        console.log("Onchain receip", data);
        console.log(`Registering user ${username} with address ${wallet.address} and private key ${wallet.privateKey}`);
        res.json({ value: { address: wallet.address, privateKey: wallet.privateKey, mnemonic: wallet.mnemonic.phrase, username: req.body.username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Error registering ${username}` });
    }
});

app.post('/generateEggImages', async (req, res) => {
    const { modelId, prompt, frogs } = req.body;
    try {
        const eggCids = [];
        frogs.foreach(frog => {
            promptContract.methods.calculateAIResult(50, prompt);
            const cid = promptContract.methods.getAIResult(50, prompt);
            eggCids.push(cid);
        });
        res.json({ value: { eggCids } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error registering frog in the smart contract' });
    }
});


// Use this method to send a message via XMTP if the recipient is on the XMTP network
// Otherwise, send with web2 but count the messaging on-chain
// TODO should infer sender from header token, for now, just grab from request body
// req.body = {
//   fromAddress: string,
//   toAddress: string,
//   message: string
// }
// returns the messages in the conversation
app.post("/croak", async (req, res) => {

    const { fromAddress, toAddress, message } = req.body;

    console.log(fromAddress, toAddress);
    try {
        // Send a message with XMTP

        const privateKey = process.env.WALLET_PRIVATE_KEY;
        const wallet = new Wallet(privateKey);
        const signer = wallet.connect(provider);

        const xmtp = await Client.create(signer, { env: "dev" });
        
        const isOnXMTPNetwork = await xmtp.canMessage(toAddress);
        if (isOnXMTPNetwork) {
            // Start a conversation with XMTP
            const conversation = await xmtp.conversations.newConversation(toAddress);
            // Load all messages in the conversation
            const messages = await conversation.messages();
            // Send a message
            await conversation.send(message);
            // Listen for new messages in the conversation
            for await (const message of await conversation.streamMessages()) {
                console.log(`[${message.senderAddress}]: ${message.content}`);
            }
        }
        // Call smart contract
        const data = await contract.methods.croak(toAddress).send({ from: fromAddress });
        console.log(data);
        res.json({ value: messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Error croaking!` });
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

// Endpoint to hatch a tadpole (mint as NFT)
app.post("/hatchTadpole", async (req, res) => {
    const { fromAddress, toAddress } = req.body;
    try {
        var receipt = await contract.methods.hatchTadpole(toAddress).send({ from: fromAddress });
        console.log("receipt", receipt);
        res.json({ value: receipt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error minting tadpoles' });
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