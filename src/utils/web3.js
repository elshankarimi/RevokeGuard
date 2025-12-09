import { BrowserProvider, Contract, parseUnits } from 'ethers';

// Standard ERC-20 ABI subset needed for revoking and checking allowances
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)",
  "function symbol() public view returns (string)",
  "function decimals() public view returns (uint8)"
];

let provider;
let signer;
let currentAddress;

// --- Connection ---
export const connectToMetamask = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed. Please install it to connect.");
  }
  
  provider = new BrowserProvider(window.ethereum);
  
  // Request account access
  const accounts = await provider.send("eth_requestAccounts", []);
  currentAddress = accounts[0];
  
  signer = await provider.getSigner();
  
  return currentAddress;
};

// --- Transaction (Revoke) ---
export const revokeToken = async (tokenContractAddress, spenderAddress) => {
  if (!signer || !currentAddress) {
    throw new Error("Wallet not connected.");
  }
  
  // Create a contract instance for the token
  const tokenContract = new Contract(tokenContractAddress, ERC20_ABI, signer);
  
  // Check current allowance (optional safety check)
  const currentAllowance = await tokenContract.allowance(currentAddress, spenderAddress);
  console.log(`Current allowance: ${currentAllowance.toString()}`);

  // Revoke by setting allowance to 0. 
  // We use parseUnits('0') for clarity, though 0n (BigInt zero) would also work.
  const tx = await tokenContract.approve(spenderAddress, 0); 
  
  console.log('Revoke transaction hash:', tx.hash);
  
  // Wait for the transaction to be mined
  await tx.wait();
  
  return tx.hash;
};


// --- Indexer Communication (Placeholder/Future Use) ---
// This function would be used to communicate with the Cloudflare Worker 
// to trigger a historical scan, but for now, we rely on the fetch in App.jsx.
export const checkApprovals = async (address) => {
    // Worker logic will be implemented here
    return [];
};
