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