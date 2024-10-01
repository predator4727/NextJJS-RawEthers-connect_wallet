"use client"; // This marks the component as a Client Component

import { useState } from "react";
import { ethers } from "ethers";

// connect to metamask
// execute a function


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        let connectedProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(connectedProvider);
        const signer = await connectedProvider.getSigner();
        setSigner(signer);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Metamask not found");
    }
  }

  async function execute() {
    const contractAddress = "0xF9e73552c3E17A440128E752002db6f06FA481E3";
    const abi = [
      {
        "type": "function",
        "name": "getNumber",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "number",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "setNumber",
        "inputs": [
          {
            "name": "newNumber",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      }
    ];
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      await contract.setNumber(42);
    } catch (error) {
      console.error("Transaction error", error);
    }
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {isConnected ? (
        <>
          "CONNECTED"
          <button className="border" onClick={() => execute()}>Execute</button>
        </>
      ) : (
        <button className="border" onClick={() => connect()}>Connect</button>
      )}
    </div>
  );
}
