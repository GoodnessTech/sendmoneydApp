# SendMoney dApp

A simple decentralized application (dApp) built with Solidity, HTML, CSS, and JavaScript. This dApp allows users to deposit and withdraw ETH to and from a smart contract deployed on the Base Sepolia testnet.

## Features

- Connect wallet using MetaMask
- Deposit ETH into the smart contract
- View contract balance and your individual deposit
- Withdraw up to 1 ETH (owner-only)
- Ownership-protected withdrawals
- Fully responsive and styled UI

## Smart Contract

- Language: Solidity
- Network: Base Sepolia Testnet
- Contract Address: `0x377220AddA59e49D285AFE8d9cAEEC154412D16f`

### Functions

- `deposit()` — payable function to deposit ETH
- `withdraw(uint amount)` — owner-only withdrawal with 1 ETH limit
- `getContractBalance()` — returns total contract balance
- `userBalances(address)` — tracks deposits per user

## Tech Stack

- Solidity
- Ethers.js
- HTML/CSS/JavaScript
- MetaMask for wallet connection
- Vercel (for deployment)

## How to Run Locally

1. Clone the repository:

```

git clone https://github.com/GoodnessTech/sendmoney-dapp.git

cd sendmoney-dapp

```

2. Open `index.html` in a browser using a live server or VSCode extension.

3. Make sure MetaMask is installed and connected to Base Sepolia Testnet.

4. Interact with the dApp.

## Deployment

This project is deployed using [Vercel](https://vercel.com).

## Credits

Deployed by **KingTublas**, built onchain.

```

```
