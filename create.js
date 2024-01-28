const { BIP32Factory } = require("bip32");
const sep = require("tiny-secp256k1");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

const network = bitcoin.networks.bitcoin;

const path = `m/44'/1'/0'/0`;
let mnemonic = bip39.generateMnemonic();
let seed = bip39.mnemonicToSeedSync(mnemonic);
let root = BIP32Factory(sep).fromSeed(seed, network);

let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAdd = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address;

console.log(`
Bitcoin Wallet Generated:
- Address: ${btcAdd},
- Key: ${node.toWIF()},
- Mnemonic: ${mnemonic}
`);
