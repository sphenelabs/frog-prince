# step 1 register frog
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"username":"Bob", "descriptor": "Chubby Asian male living in Taipei. Loves blockchain and bbt."}'
curl -X POST http://54.162.239.85:3000/register -H "Content-Type: application/json" -d '{"username":"Bob", "descriptor": "Chubby Asian male living in Taipei. Loves blockchain and bbt."}'

# step 2 like another frog (show affection by sending them mosquitoes)
curl -X POST http://localhost:3000/sendMosquitoes -H "Content-Type: application/json" -d '{"fromAddress":"0x0xe015D6eFaC7030aa18A36227C30543c54AC68A5a", "toAddress":"0xFe328a3CF3776850F342107884cb1448F45790eF"}'

# step 3 croak and get to know each other
curl -X POST http://localhost:3000/croak -H "Content-Type: application/json" -d '{"fromAddress":"0x0xe015D6eFaC7030aa18A36227C30543c54AC68A5a", "message":"Hello, world!", "toAddress":"0xFe328a3CF3776850F342107884cb1448F45790eF"}'

# lay egg
curl -X POST http://localhost:3000/layEgg -H "Content-Type: application/json" -d '{"fromAddress":"0x0xe015D6eFaC7030aa18A36227C30543c54AC68A5a", "toAddress":"0xFe328a3CF3776850F342107884cb1448F45790eF", "prompt": "mom: asian, tall, skinny, basketball. dad: white, tall, dimples, blue eyes, volleyball"}'