# @investorphem/stx-utils

[![npm version](https://img.shields.io/npm/v/@investorphem/stx-utils.svg?style=flat-square)](https://www.npmjs.com/package/@investorphem/stx-utils)
[![npm downloads](https://img.shields.io/npm/dm/@investorphem/stx-utils.svg?style=flat-square)](https://www.npmjs.com/package/@investorphem/stx-utils)
[![License](https://img.shields.io/npm/l/@investorphem/stx-utils.svg?style=flat-square)](LICENSE)
[![Build Status](https://github.com/investorphem/stx-utils/actions/workflows/publish.yml/badge.svg)](https://github.com/investorphem/stx-utils/actions/workflows/publish.yml)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Contributors](https://img.shields.io/github/contributors/investorphem/stx-utils.svg)](https://github.com/investorphem/stx-utils/graphs/contributors)

---

## 🚀 Description

`@investorphem/stx-utils` is a modern JavaScript utility library for interacting with the Stacks blockchain. It provides essential, type-safe functions to send STX programmatically, validate wallet addresses, and cleanly convert STX units for frontend interfaces.

## ✨ Features

* 💸 **Send STX tokens** programmatically via backend or Node.js scripts
* ✅ **Validate Stacks addresses** securely without crashing your app
* 🔄 **Convert STX units** between STX and micro-STX with BigInt support
* 🛡️ **Null-Safe:** Safely handles empty or malformed inputs
* ⚡ **Modern ESM:** Native ES Module support (`import`/`export`)
* 🤖 Fully automated GitHub Actions publishing workflow

## 📦 Installation

```bash
npm install @investorphem/stx-utils
```

*Note: This package requires `@stacks/network` and `@stacks/transactions` as peer dependencies. Ensure they are installed in your project.*

## 🧠 Usage (ES Modules)

Since version 1.0.2, this package uses standard ES Modules.

```javascript
import { stxToMicro, microToStx, isValidAddress, sendSTX } from '@investorphem/stx-utils';

console.log(stxToMicro(1.5)); // 1500000n
console.log(microToStx(1500000n)); // 1.5
console.log(isValidAddress('SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR')); // true

// Sending STX programmatically (async)
async function executeTransfer() {
  try {
    const result = await sendSTX(
      '<your-private-key>', 
      'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR', 
      0.1, 
      'mainnet' // Defaults to 'testnet' if omitted
    );
    console.log("Transaction broadcasted:", result);
  } catch (error) {
    console.error("Transfer failed:", error);
  }
}

executeTransfer();
```

## 📚 API

### `stxToMicro(amount)`

Converts standard STX to micro-STX (1 STX = 1,000,000 micro-STX).

**Returns:** *BigInt*

---

### `microToStx(amount)`

Converts micro-STX back to standard STX for UI display.

**Returns:** *Number*

---

### `isValidAddress(address)`

Validates if a string is a properly formatted Stacks address. Safely catches underlying library errors.

**Returns:** *boolean*

---

### `sendSTX(senderKey, recipient, amount, network)`

Broadcasts an STX token transfer to the network using a private key. Designed for Node.js / backend environments.

**Parameters:**
* `senderKey` *(string)* – Private key of the sender
* `recipient` *(string)* – STX address of the recipient
* `amount` *(number)* – STX amount to send (automatically converted to micro-STX)
* `network` *(string)* – `'testnet'` or `'mainnet'` (default: `'testnet'`)

**Returns:**
* Promise resolving to the Stacks transaction broadcast result.

---

## ⚙️ Automated Releases

This project uses an automated release script. To publish a new version:

1. Commit your changes: `git commit -m "update stx utilities"`
2. Run the release command: `npm run release`

This will automatically bump the patch version, create a git tag, and push to GitHub, triggering the automated NPM publish action.

---

## 🛠️ Contributing

Contributions are welcome! Please fork the repo, make improvements, and submit a pull request. Ensure code follows [StandardJS style](https://standardjs.com).

## 📄 License

MIT License

---

*Maintained by Oluwafemi Olagoke*
