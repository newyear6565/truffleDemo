/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'your self 12 chars';

require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3();
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');

var mainNetPrivateKey = new Buffer("5a9be97c1d41cfb86455b11971d670d72fefe3be45af4307aeeb026537539671", "hex")
var mainNetWallet = Wallet.fromPrivateKey(mainNetPrivateKey);
var mainNetProvider = new WalletProvider(mainNetWallet, "https://mainnet.infura.io/");

var ropstenPrivateKey = "";//new Buffer(process.env["ROPSTEN_PRIVATE_KEY"], "hex")
var ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);
var ropstenProvider = new WalletProvider(ropstenWallet, "https://ropsten.infura.io/");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
        host: "127.0.0.1",
        port: 8545,
        gas: 7500000,
        network_id: "99" // Match any network id
    },
    kovan: {
        gasPrice: 5000000000,
        provider: function() {
            return new HDWalletProvider(mnemonic,
                "https://kovan.infura.io/v3/09c30ad18ed145c3997b0621e1816909")
        },
        network_id: 3
    },
    ropsten: {
       // gas: 8000000,
        gasPrice: 8000000000,
        provider: ropstenProvider,
        network_id: 2
    },
    mainnet: {
        gas: 75000000000,
        gasPrice: 4500000000,
        provider: mainNetProvider,
        network_id: "*" // Match any network id

    }
}
};
