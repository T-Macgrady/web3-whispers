## Introduction

A web3 decentralized social platform built on the Ethereum blockchain

## Tech Stack

Built with the following technologies:

- frontend

  - [wagmi.sh](https://wagmi.sh/): React hooks for Ethereum
  - [RainbowKit](https://www.rainbowkit.com/): React components for connecting wallets
  - [Next.js](https://nextjs.org/): Static site builds and routing
  - [Tailwind](https://tailwindcss.com/): Adaptive CSS page styling

- smart contract

  - [Hardhat](https://hardhat.org/): Smart contract development and testing
  - [openzeppelin](https://www.openzeppelin.com/): an framework for building secure and auditable smart contracts

- [Vercel](https://vercel.com/): Web hosting and automatic deployments

## Installation

### Prereqs

- [Etherscan API key](https://etherscan.io/apis)
- [Infura API key(s)](https://infura.io/) for your chosen networks

Update [.env file](./hardhat/.env.example), and then:

```
git clone https://github.com/maxpetretta/twitt3r.xyz
cd twitt3r.xyz/hardhat
npm install
```

### Smart Contract

```
npx hardhat node
npx hardhat run scripts/deploy.js --network <NETWORK_NAME>
npx hardhat verify --network <NETWORK_NAME> <CONTRACT_ADDRESS> "10" "1000000000000000" "100000000000000000"
```

### Frontend

After you've deployed the contract, you are ready to set up the frontend website. Copy the contract address to [contract.js](./react/lib/contract.js), and optionally [the ABI](./react/lib/abi/Twitt3r.json) if you've modified the contract. Then run:

```
cd ../react
npm install
npm run dev
open http://localhost:3000
```

## Tests

```
cd ./hardhat
npx hardhat test
```
