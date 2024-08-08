const { ethers } = require("ethers");

async function connect() {
    if (typeof window.ethereum != "undefined") {
        ethereum.request({ method: "eth_requestAccounts" });
    }
}
async function execute() {
    /*In order to execute a solidity function you need the following:
    1) Address
    2) Contract ABI (blue print to interact with the contract)
    3) Contract Function
    4) Node connection
    */

}

module.exports = {

    connect,
    execute,
};