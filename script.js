window.addEventListener("load", () => {
  let provider;
  let signer;
  let contract;

  const CONTRACT_ADDRESS = "0x377220AddA59e49D285AFE8d9cAEEC154412D16f";
  const CONTRACT_ABI = [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposited",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalReceived",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userBalances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

  // UI elements
  const connectBtn = document.getElementById("connectButton");
  const walletAddressText = document.getElementById("walletAddress");
  const contractBalanceText = document.getElementById("contractBalance");
  const userBalanceText = document.getElementById("userBalance");
  const depositBtn = document.getElementById("depositButton");
  const withdrawBtn = document.getElementById("withdrawButton");

  // ✅ Connect wallet
  connectBtn.onclick = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this app.");
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    const userAddress = await signer.getAddress();
    walletAddressText.textContent = `Wallet: ${userAddress}`;

    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    await loadContractInfo();
  };

  // ✅ Load contract + user info
  async function loadContractInfo() {
    if (!contract || !signer) return;

    try {
      const contractBal = await contract.getContractBalance();
      const formattedBal = ethers.utils.formatEther(contractBal);
      contractBalanceText.textContent = formattedBal;

      const user = await signer.getAddress();
      const userBal = await contract.userBalances(user);
      const formattedUserBal = ethers.utils.formatEther(userBal);
      userBalanceText.textContent = formattedUserBal;
    } catch (err) {
      console.error("Error loading contract info:", err);
    }
  }

  // ✅ Deposit ETH
  depositBtn.onclick = async () => {
    const input = document.getElementById("depositAmount");
    const amount = input.value;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return alert("Enter a valid ETH amount.");
    }

    try {
      const tx = await contract.deposit({
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      alert(`Deposited ${amount} ETH ✅`);
      input.value = "";
      await loadContractInfo();
    } catch (err) {
      console.error("Deposit failed:", err);
      alert("Deposit failed.");
    }
  };

  // ✅ Withdraw ETH (owner only, max 1 ETH)
  withdrawBtn.onclick = async () => {
    const input = document.getElementById("withdrawAmount");
    const amount = input.value;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return alert("Enter a valid ETH amount.");
    }

    if (Number(amount) > 1) {
      return alert("Cannot withdraw more than 1 ETH.");
    }

    try {
      const tx = await contract.withdraw(ethers.utils.parseEther(amount));
      await tx.wait();
      alert(`Withdrew ${amount} ETH ✅`);
      input.value = "";
      await loadContractInfo();
    } catch (err) {
      console.error("Withdraw failed:", err);
      alert("Only the owner can withdraw.");
    }
  };
});
