require('dotenv').config()
const fetch = require('node-fetch');

const url = 'https://api.circle.com/v1/w3s/developer/wallets';
const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.TEST_API_KEY}`},
  body: JSON.stringify({
    idempotencyKey: '6bdb88b7-3bbb-4476-a81f-f7ef1bea7fd2',
    entitySecretCipherText: process.env.ENTITY_SECRET_CIPHERTEXT,
    blockchains: ['MATIC-MUMBAI'],
    count: 10,
    walletSetId: process.env.WALLET_SET_ID,
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));