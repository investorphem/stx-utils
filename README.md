# @investorphem/stx-utils

[![npm version](https://img.shields.io/npm/v/@investorphem/stx-utils.svg?style=flat-square)](https://www.npmjs.com/package/@investorphem/stx-utils)
[![npm downloads](https://img.shields.io/npm/dm/@investorphem/stx-utils.svg?style=flat-square)](https://www.npmjs.com/package/@investorphem/stx-utils)
[![License](https://img.shields.io/npm/l/@investorphem/stx-utils.svg?style=flat-square)](LICENSE)
[![Build Status](https://github.com/investorphem/stx-utils/actions/workflows/publish.yml/badge.svg)](https://github.com/investorphem/stx-utils/actions/workflows/publish.yml)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Contributors](https://img.shields.io/github/contributors/investorphem/stx-utils.svg)](https://github.com/<your-username>/stx-utils/graphs/contributors)

---

## Description

`@investorphem/stx-utils` is a JavaScript utility library for interacting with the Stacks blockchain. It provides functions to send STX, read contract state, validate addresses, and convert STX units.

## Features

* Send STX tokens programmatically
* Read-only contract calls
* Validate Stacks addresses
* Convert between STX and micro-STX
* Check account balances
* Fully automated GitHub Actions publishing workflow

## Installation

```bash
npm install @investorphem/stx-utils
npm install @stacks/transactions @stacks/network @stacks/crypto
```

## Usage

```js
const { stxToMicro, microToStx, isValidAddress, sendSTX } = require('@investorphem/stx-utils');

console.log(stxToMicro(1.5)); // 1500000n
console.log(microToStx(1500000n)); // 1.5
console.log(isValidAddress('ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKDTFJ9AHA')); // true

// Sending STX (async)
(async () => {
  const result = await sendSTX('<private-key>', 'ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKDTFJ9AHA', 0.1, 'testnet');
  console.log(result);
})();
```

## API

### `stxToMicro(amount)`

Converts STX to micro-STX.

### `microToStx(amount)`

Converts micro-STX to STX.

### `isValidAddress(address)`

Validates a Stacks address.

### `sendSTX(senderKey, recipient, amount, network)`

Sends STX tokens from a private key to a recipient.

**Parameters:**

* `senderKey` *(string)* – private key of sender
* `recipient` *(string)* – STX address of recipient
* `amount` *(number)* – STX amount
* `network` *(string)* – 'testnet' or 'mainnet' (default: testnet)

**Returns:**

* Promise resolving to transaction result

## Contributing

Contributions are welcome! Fork the repo, make improvements, and submit a pull request. Ensure code follows [StandardJS style](https://standardjs.com).

## License

MIT License

---

*Maintained by Oluwafemi Olagoke*

---

## File Structure for Repo

```
stx-utils/
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── LICENSE
└── .github/
    └── workflows/
        └── publish.yml
```

### index.js

```js
const { StacksTestnet, StacksMainnet } = require('@stacks/network');
const { broadcastTransaction, makeSTXTokenTransfer } = require('@stacks/transactions');
const { validateStacksAddress } = require('@stacks/crypto');

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
```

### package.json

```json
{
  "name": "@investorphem/stx-utils",
  "version": "1.0.0",
  "description": "JavaScript utility library for interacting with the Stacks blockchain.",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "test": "echo \"No tests yet\" && exit 0"
  },
  "author": "Oluwafemi Olagoke",
  "dependencies": {
    "@stacks/transactions": "^3.0.0",
    "@stacks/network": "^3.0.0",
    "@stacks/crypto": "^3.0.0"
  }
}
```

### .github/workflows/publish.yml

```yaml
name: Auto Publish to npm

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: write

jobs:
  publish:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org/'

      - name: Install dependencies
        run: npm install

      - name: Test
        run: npm test || echo "No tests found"

      - name: Setup Git
        run: |
          git config user.name "github-actions"
          git config user.email "github-actions@github.com"

      - name: Get current version
        id: current_version
        run: echo "version=$(node -p \"require('./package.json').version\")" >> $GITHUB_OUTPUT

      - name: Bump version
        if: "!contains(github.event.head_commit.message, 'ci: release')"
        run: npm version patch -m "ci: release %s"

      - name: Push version
        if: "!contains(github.event.head_commit.message, 'ci: release')"
        run: git push origin main --follow-tags

      - name: Get new version
        id: new_version
        run: echo "version=$(node -p \"require('./package.json').version\")" >> $GITHUB_OUTPUT

      - name: Check version on npm
        id: check_version
        run: |
          npm view @investorphem/stx-utils@${{ steps.new_version.outputs.version }} version || echo "not_found=true" >> $GITHUB_OUTPUT

      - name: Publish to npm
        if: steps.check_version.outputs.not_found == 'true'
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```
