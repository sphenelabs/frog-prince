require('dotenv').config()
var express = require('express');
const { Web3 } = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const { Client } = require('@xmtp/xmtp-js');
const axios = require('axios');

const OpenAI = require('openai');
const openai = new OpenAI({apiKey: process.env.TXT_PROMPT_API_KEY});

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
 *   username: string,
 *   descriptor: string
 * }
 * Returns the wallet address and private key created for that user
 */
app.post('/register', async (req, res) => {
    const { username, descriptor } = req.body;
    try {
        const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
        const wallet = await web3.eth.accounts.create();
        // const contract = new web3.eth.Contract(SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS);
        // const data = await contract.methods.register(username, descriptor).send({ from: wallet.address });
        // console.log("Onchain receip", data);
        console.log(`Registering user ${username} with address ${wallet.address} and private key ${wallet.privateKey}`);
        res.json({ value: { address: wallet.address, privateKey: wallet.privateKey, username: req.body.username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Error registering ${username}` });
    }
});

/**
 * Generate egg images for a prompt
 * req.body = {
 *  fromAddress: string,
 *  toAddress: string,
 *  prompt: string
 * }
 */
app.post('/layEgg', async (req, res) => {
    const { fromAddress, toAddress, prompt } = req.body;
    try {

        // generate a better prompt using our own openai customgpt
        // const response = await axios.post(process.env.TXT_PROMPT_MODEL_URL, {
        //     prompt: prompt,
        // }, {
        //     headers: {
        //       'Authorization': `Bearer ${process.env.TXT_PROMPT_API_KEY}`, // Or "X-API-KEY": apiKey depending on the API
        // }});
      
        // console.log('Generated Text:', response.data);

        // ORA Stable Diffusion Model
        // const abi = require(process.env.TXT_PROMPT_CONTRACT_ABI_PATH);
        // const provider = new Provider(WALLET_PRIVATE_KEY, process.env.TXT_PROMPT_RPC_URL);
        // const web3 = new Web3(provider);
        // const promptContract = new web3.eth.Contract(abi, process.env.TXT_PROMPT_CONTRACT_ADDRESS);
        // const receipt = await promptContract.methods.calculateAIResult(50, prompt).send({
        //     from: WALLET_ADDRESS,
        //     value: 180000000000000000 // Value in Wei (0.18 ETH)
        //   });
        // console.log("receipt", receipt);

        // step 1 generate text prompt
 
        // step 2 feed the text prompt to dall-e
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });
        console.log("Generate image", response);
        res.json({ value: { url: response.data[0].url } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error laying eggs!' });
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