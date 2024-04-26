# blockchain_wine_supply_chain
A Repository for the project of my Thesis, which is a blockchain based application to prevent wine counterfeiting using smart contracts

# Technologies used
## Blockchain
- **Solidity** for smart contract development
- **Hardhat** for dAPP development
- **ChaiJS** for unit testing

## Frontend
- Ethereum Wallet --> Metamask
- Performant Node Package Manager - PNPM
- SvelteKit - Typescript
- Blockchain libraries
    - Ethers-svelte
    - Ethers.js
- Shadcn-svelte - Tailwinds

# How to run locally 

## Tools needed
Frontend:
- Node.js --> **npm/pnpm**
- **Metamask** Browser extension

Backend
 - **Yarn** package manager


## Blockchain
1. Install dependencies\
**yarn install**

2. Simulate local blockchain using the hardhat network\
**yarn hardhat node**

3. Compile smart contracts\
**yarn hardhat compile**

4. Deploy compiled smart contract to local hardhat blockchain\
**yarn hardhat run scripts/deploy.js --network localhost**

## Metamask
1. Install **Metamask** browser extension, register an account

2. Add hardhat network as custom network
    - Network name: Hardhat
    - RPC URL: http://127.0.0.1:8545
    - Chain ID: 31337
    - Currency symbol: HardhatETH

3. Import a Metamask account using a private key from hardhat node\
**Add account or hardware wallet** --> **Import Account** --> **Enter private key**
4. Change the network to Hardhat, change to the added account

### Notes
Every time you restart the local blockchain, you need to clear "cache" in metamask\
**Settings** --> **Advanced** --> **Clear activity tab data**

## Frontend

1. Install dependencies\
**pnpm install** or **npm install**

2. Run local development server\
**pnpm run dev**

Open http://localhost:5173/ and use the application


