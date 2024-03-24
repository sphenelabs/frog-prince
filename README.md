# 👑🐸 FROG PRINCE 🐸👑

FrogPrince is an innovative and engaging Web3 dating app for everyone that showcases AI-generated future baby photos of matched users that evolves based on info gathered in the peer-to-peer (P2P) chat conversations using Large Language Model (LLM), collect tadpoles (babies) as NFTs, smart contract facilitated matching, gamified progressive dating experience to incentivize interaction. It is future-forward, heartwarming, and family-oriented in nature, focusing on the concept of getting a sneak peek into a possible shared future with AI-generated baby photos of matched users.

## Mint Club Bonding Curve Assets

TAPO ([0xbC9F0d339D1CB9a587857A60eD5079250F7c48a0](https://mint.club/token/sepolia/TP)) is a bonding curve ERC20 created with Mint Club with a linear bonding curve on a WETH base asset. TAPO is given to platform users to incentivize positive interactions between members to foster a lively and loving community!

[FROG](https://testnets.opensea.io/assets/sepolia/0xd5826ccee83F5A0033a183C102E6e3AeE660206B/0) ([0xd5826ccee83f5a0033a183c102e6e3aee660206b](https://mint.club/nft/sepolia/FROG)) is a bonding curve ERC1155 created with Mint Club with an exponential bonding curve on WETH base asset. FROG is a membership token given to frogs of FrogPrince based on when they first hop on the platform. People who registered during EthTaipei2024 will receive a founding membership token and get an opportunity in getting involved with the FrogPrince's development and growth! Join now before the hackathon ends!

![FROG NFT](https://github.com/sphenelabs/frog-prince/blob/main/screenshots/Screenshot%20from%202024-03-23%2022-43-09.png)

## Techstack

1. Frontend
  * Bubble
2. Backend
  * NodeJS, Express
3. Smart contracts deployed on Linea, Scroll, Optimism, Sepolia, Thundercore
  * Wallet
  * Circle’s programmable wallet
  * Web3js 
4. P2P Messaging
  * XMTP
5. Digital Asset
  * MintClub bonding curve asset
6. Generative AI
  * Ora model 50 Stable Diffusion for image generation
  * OpenAI GPT4 for baby descriptor generation instead of LLMA OAO as it’s not powerful enough for our needs after a lot of trying (too slow and too costly 0.18 ETH plus gas fee per generation)
  * Dalle3 for image generation


## How to Run It?

### Node Server
Currently a backend server is needed for:
1. Interacting with XMTP
2. Generating EOA key pairs for web2 users
(These are not directly on the client frontend as we are trying Bubbl low-code solution and had some troubles integrating web3 libs directly in there!)

To run, simply go `npm run start`.
And you should have an instance on port 3000 (dev) and 80 (prod).
Check out the `curl-test.bash` script for some quick examples of how to call the REST API endpoints.

### Smart contracts
1. Copy and paste contract codes into Remix to deploy!
2. Select the chain to use. E.g. Inject provider from Metamask Linea Testnet [check guide](https://docs.linea.build/build-on-linea/quickstart/deploy-smart-contract/remix)


### Testnet Contracts

1. Linea Goerli [0x43b5dbc8d72b23061b41d48ab8299c3712f1b38f](https://goerli.lineascan.build/address/0x43b5dbc8d72b23061b41d48ab8299c3712f1b38f#code) (Note this is with older version of compiler before Shanghai upgrade!)
2. Scroll Sepolia [0x1e78f9c7ea2c82a86fd359f646de22cbdf4cbcad](https://sepolia.scrollscan.com/address/0x1e78f9c7ea2c82a86fd359f646de22cbdf4cbcad#code)
3. Sepolia [0x00413c9b9dbcd5b26bedff354bb1a675ffa989d0](https://sepolia.etherscan.io/tx/0x3dd58d5deb5b1b0355f5bd3af30ad620e28c5ac78d599dc7a64a88abe670b946)
4. Optimism Sepolia [0x00413c9B9DbCD5b26bEDff354bB1A675ffa989d0](https://optimism-sepolia.blockscout.com/address/0x00413c9B9DbCD5b26bEDff354bB1A675ffa989d0)
5. Thundercore [0x0C54CA098605f36A2B0400386D91233b034398fa](https://explorer-testnet.thundercore.com/address/0x0C54CA098605f36A2B0400386D91233b034398fa/transactions)

Problems with the Different Networks

Different network had different issues.
1. Linea Goerli - `hatchTadpole` exists block limit; had to use older version of compiler and OZ
2. Scroll Sepolia - all functions work
3. Sepolia - `hatchTadpole` pending for a long time and got dropped
4. OP Sepolia - could not verify contract
5. Thundercore - hard to verify; takes higher eth than other networks scales of single digit eth to deploy instead of fractions
   
## ORA

ORA is on Sepolia. Amount to pay per generation is quite high at 0.18 ether. We end up implementing offchain generation as well (way cheaper in production than ORA). Here is a diagram of the flow of content generation from attribute of dating profiles to their baby tadpole images! Babies will evolve with chat history as the frogs discover each other and learn more about each other's passions!

![GENAIFLOW](https://github.com/sphenelabs/frog-prince/blob/main/screenshots/Screenshot%20from%202024-03-23%2022-10-41.png)


## Confidential! 
Here is a set of confidentials to get you started playing with the app on testnet! Note that these are Testnet credentials only. Replace with your own and keep them safe when going live!

### Circle Programmable Wallet

TEST_API_KEY=TEST_API_KEY:5b81631ebac9ad20efc3f79d7ace75d1:97d05ea83317daed964148214e8b58c3
ENTITY_SECRET=2e64e97a83124bbba1672d2ac412a472b44e4790b22f08882eb5cd2892a455d0
ENTITY_SECRET_CIPHERTEXT=UvmfaEXj3BslK2Nlf/VhfFQRmUaQJDfdbWGqPgy3YJdVnMItgY+ZOSHDkQh52Ti6T9FOP6kOSeDbrpZYbay0bS+cUclD6X4fV/0tRF9mEgjH45LlzdAF//zhbV+T2SEUywsnLR8jVvyLDZ2clIEALFOlhIj9AbEWIb0zpRg9X2Y85+6mE+U/bqmekVlKK4VgjswSl8pq5kZfZUIBAvw/ubNqfQd4dw61ZU/I3GWh1mGgqOj8uQ8/hib9WDWncgDNj+NjNGNL3OK8yQZQKqGCFf+lXSrLqXWhxcphq2pmZjMQ451EzG7vRZE0IMJwJU7Wvmi5a6tWT5NXYS+WR2SBrYPOyRcGT+Ewp9e2+Pcv1+ECFmhgy2C9lO7JtYI5Xy/T/ycscRO3N9U+COD8Bp8b2SmyfNG212pzKzrgW/cFicYQ5hQv6xotCA9/g3VzxtEs9BoY3XTY5MSPifFaFVqIcf3sSTiYQmUfHozdCR29ur5Odg5ScqbUAdnhuVCMaT2+AE0XVe7kyKc2FHJ1eu/UAmVJUi/QMtDX7raoFYEYbwtFnx4RYDewcZnvkWhscYWKrpiXUbnrgOkNlEXGk7RUpeyzUkFVL6Oy/px2tvlr1ck6bg2//rOeoF2pGN/Ck1U8whLrBoxaZI/mFI965apDp55Oz4wTFCOhO6tXSqvWPEs=
WALLET_SET_ID=018e69c7-0e90-73b1-8ae1-55ad64e7553f
WALLET_SET_NAME=frogs

```
{
  "data": {
    "walletSet": {
      "id": "018e69c7-0e90-73b1-8ae1-55ad64e7553f",
      "custodyType": "DEVELOPER",
      "name": "frogs",
      "updateDate": "2024-03-23T05:27:16Z",
      "createDate": "2024-03-23T05:27:16Z"
    }
  }
}
```

❤️ 2024 EthTaipei Hackathon! Thank you to mentors, organizers, volunteers and staffs! ❤️
