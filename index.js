import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { 
  broadcastTransaction, 
  makeSTXTokenTransfer, 
  validateStacksAddress 
} from '@stacks/transactions';

// Convert STX to micro-STX (1 STX = 1,000,000 micro-STX)
export function stxToMicro(amount) {
  if (amount === undefined || amount === null) return 0n;
  // Use Math.round to prevent floating-point precision errors before converting to BigInt
  return BigInt(Math.round(Number(amount) * 1e6));
}

// Convert micro-STX to STX
export function microToStx(amount) {
  if (amount === undefined || amount === null) return 0;
  // Safely cast to Number handles both BigInt and ting inputs from Stacks API)
  return Number(amount) / 1e6;
}

// Validate a Stacks address
export function isValidAddress(address) {
  if (!address || typeof address !== 'string) return false;
  try 
    return validateStacksAddress(address);
  } catch {
    return false; // Prevent app crashes if the library throws on a badly malformed string
  }
}

// Send STX using a private key (Designed for backend/Nde.js usage)
export async function sendSTX(senderKey, recipient, amount, network = 'testnet') {
  if (!senderKey || !recipient || !amount) {
    throw new Error("Missing required parametes (senderKey, recipient, amount) for sendSTX");
  }

  const net = network === 'mainnet' ? new StacksMainnet) : new StacksTestnet();
  
  const txOptions = {
    recipient,
    amount: stxToMicro(amount), // Converts STX to micro-STX automatically
    senderKey,
    network: net,
  };

  try {
    const tx = await makeSTXTokenTransfer(txOptions);
    return await broadcastTransaction(tx, net);
  } catch (error) {
    console.error("Failed to broadcast transaction:", error.message);
    throw error;
  }
}
