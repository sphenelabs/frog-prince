# 👑🐸 FROG PRINCE 🐸👑

2024 EthTaipei Hackathon!

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

Linea Goerli [0x43b5dbc8d72b23061b41d48ab8299c3712f1b38f](https://goerli.lineascan.build/address/0x43b5dbc8d72b23061b41d48ab8299c3712f1b38f#code) (Note this is with older version of compiler before Shanghai upgrade!)
Scroll Sepolia [0x1e78f9c7ea2c82a86fd359f646de22cbdf4cbcad](https://sepolia.scrollscan.com/address/0x1e78f9c7ea2c82a86fd359f646de22cbdf4cbcad#code)
Sepolia [0x00413c9b9dbcd5b26bedff354bb1a675ffa989d0](https://sepolia.etherscan.io/tx/0x3dd58d5deb5b1b0355f5bd3af30ad620e28c5ac78d599dc7a64a88abe670b946)
Optimism Sepolia [0x00413c9B9DbCD5b26bEDff354bB1A675ffa989d0](https://optimism-sepolia.blockscout.com/address/0x00413c9B9DbCD5b26bEDff354bB1A675ffa989d0)

#### Problems with the Different Networks

Different network had different issues.
1. Linea Goerli - `hatchTadpole` exists block limit; had to use older version of compiler and OZ
2. Scroll Sepolia - all functions work
3. Sepolia - `hatchTadpole` pending for a long time and got dropped
4. OP Sepolia - could not verify contract

### ORA

ORA is on Sepolia. Amount to pay per generation is quite high at 0.18 ether. We end up implementing offchain generation as well (way cheaper in production than ORA). 


### Confidential! 
Here is a set of confidentials to get you started playing with the app on testnet! Note that these are Testnet credentials only. Replace with your own and keep them safe when going live!

#### Circle Programmable Wallet

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
}```

