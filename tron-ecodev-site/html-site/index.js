// Use ES6 import in place of `require` to make it natively compatible with browser; no browserify needed
// Just download the minified ethers.js file from here: https://cdn.ethers.io/lib/ethers-5.6.esm.min.js
import { ethers } from "./ethers-5.6.esm.min.js";


// Assign event handlers to buttons (in place of unfavorable inline JS script in HTML elements)
// this still works even if you decide to use browserify eventually (and no need `modules.export`!)
const connectButton = document.getElementById("connectButton");
const requestButton = document.getElementById("requestButton");

connectButton.onclick = connect;
requestButton.onclick = execute;


async function connect() {
    if (typeof window.ethereum != "undefined") {
        ethereum.request({ method: "eth_requestAccounts" });
        console.log("Metamask detected, connecting...");
    }
    else {
        console.log("No metamask found...");
    }
}
async function execute() {
    /*In order to execute a solidity function you need the following:
    1) Address --> Done
    2) Contract ABI (blue print to interact with the contract) --> abi (Done)
    3) Contract Function
    4) Node connection --> Metamask (Done)
    */
    const contractAddress = "0xa47B3D9f3646Bebd4C391F7a1182C671be843C61";
    const abi = [
        {
            "type": "constructor",
            "inputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "addNewIntegration",
            "inputs": [
                {
                    "name": "_projectName",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "_description",
                    "type": "string",
                    "internalType": "string"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "addNewIssue",
            "inputs": [
                {
                    "name": "_issueTitle",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "_issueDescription",
                    "type": "string",
                    "internalType": "string"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "getIntegrationStatusFromID",
            "inputs": [
                {
                    "name": "",
                    "type": "uint128",
                    "internalType": "uint128"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getIssueStatusFromID",
            "inputs": [
                {
                    "name": "",
                    "type": "uint128",
                    "internalType": "uint128"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getIssueTitleFromID",
            "inputs": [
                {
                    "name": "",
                    "type": "uint128",
                    "internalType": "uint128"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "string",
                    "internalType": "string"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getProjectFromID",
            "inputs": [
                {
                    "name": "",
                    "type": "uint128",
                    "internalType": "uint128"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "string",
                    "internalType": "string"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "integrationIndex",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint128",
                    "internalType": "uint128"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "issueIndex",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint128",
                    "internalType": "uint128"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "listOfIntegrations",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "uniqueIDString",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "title",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "description",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "status",
                    "type": "uint8",
                    "internalType": "uint8"
                },
                {
                    "name": "voteCount",
                    "type": "uint16",
                    "internalType": "uint16"
                },
                {
                    "name": "raisedBy",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "listOfIssues",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "uniqueIDString",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "title",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "description",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "status",
                    "type": "uint8",
                    "internalType": "uint8"
                },
                {
                    "name": "voteCount",
                    "type": "uint16",
                    "internalType": "uint16"
                },
                {
                    "name": "raisedBy",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "owner",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "removeIntegration",
            "inputs": [
                {
                    "name": "_integrationIndex",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "removeProblemReport",
            "inputs": [
                {
                    "name": "_problemReportIndex",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "renounceOwnership",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "transferOwnership",
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "upVoteIR",
            "inputs": [
                {
                    "name": "_integrationIndex",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "upVotePR",
            "inputs": [
                {
                    "name": "_problemReportIndex",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "updateIRStatus",
            "inputs": [
                {
                    "name": "_integrationIndex",
                    "type": "uint8",
                    "internalType": "uint8"
                },
                {
                    "name": "_newStatus",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "updatePRStatus",
            "inputs": [
                {
                    "name": "_problemReportIndex",
                    "type": "uint8",
                    "internalType": "uint8"
                },
                {
                    "name": "_newStatus",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "event",
            "name": "OwnershipTransferred",
            "inputs": [
                {
                    "name": "previousOwner",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "newOwner",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                }
            ],
            "anonymous": false
        },
        {
            "type": "error",
            "name": "OwnableInvalidOwner",
            "inputs": [
                {
                    "name": "owner",
                    "type": "address",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "error",
            "name": "OwnableUnauthorizedAccount",
            "inputs": [
                {
                    "name": "account",
                    "type": "address",
                    "internalType": "address"
                }
            ]
        }
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();        //This is going to get the connected account
    const contract = new ethers.Contract(contractAddress, abi, signer);
    await contract.addNewIntegration("Example Integration Project", "This is Project integration description");
}

module.exports = {

    connect,
    execute,
};

