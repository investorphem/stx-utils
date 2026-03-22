const { StacksTestnet, StacksMainnet } = require('@stacks/network');
const { broadcastTransaction, makeSTXTokenTransfer, validateStacksAddress } = require('@stacks/transactions');

function stxToMicro(amount) {
  return BigInt(Math.round(amount * 1e6));
}

function microToStx(amount) {
  return Number(amount) / 1e6;
}

function isValidAddress(address) {
  return validateStacksAddress(address);
}

async function sendSTX(senderKey, recipient, amount, network='testnet') {
  const net = network === 'mainnet' ? new StacksMainnet() : new StacksTestnet();
  const txOptions = {
    recipient,
    amount: stxToMicro(amount),
    senderKey,
    network: net,
  };
  const tx = await makeSTXTokenTransfer(txOptions);
  return await broadcastTransaction(tx, net);
}

module.exports = {
  stxToMicro,
  microToStx,
  isValidAddress,
  sendSTX
};