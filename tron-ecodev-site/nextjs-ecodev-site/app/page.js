// Add this at the very top of your component file
"use client";
import Image from "next/image";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        setSigner(await provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    if (typeof window.ethereum !== "undefined") {
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
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.addNewIntegration("Example Integration Title", "Example Integration Description here");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Connecting & Interacting with a smart contract
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {hasMetamask ? (
          isConnected ? (
            "Connected! "
          ) : (
            <button onClick={() => connect()}>Connect</button>
          )
        ) : (
          "Please install metamask"
        )}

        {isConnected ? <button onClick={() => execute()}>Execute</button> : ""}
      </div>
    </main>
  );
}
