// Assign contract address and contract ABI
const MoodContractAddress = "0x5BBE58FF22e67b3f295437e74B0629546A67189C";
// An array with two object since our contract has two functions
const MoodContractABI = [

        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_mood",
                    "type": "string"
                }
            ],
            "name": "setMood",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMood",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
let MoodContract = undefined;
let signer = undefined;


// Access ethers globally since its included via script tag
// const { ethers } = window;
// Connect to the blockchain using Metamask: **our connection to the Ethereum Netowrk(Sepolia)
const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
// Request access to the user's wallet and assign values to MoodContract and signer
provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
      );
    });
  });
// With signer and MoodContract, create two functions for calling 
// the two smart contract functions

// Get mood here and display to the user
async function getMood() {
    const mood = await MoodContract.getMood();
    document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
    console.log(mood);
  }
  
  async function setMood() {
    const mood = document.getElementById("mood").value;
    await MoodContract.setMood(mood);
  }
