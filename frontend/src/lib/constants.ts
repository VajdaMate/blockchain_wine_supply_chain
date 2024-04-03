export const headerArray = ["ID", "Szőlő fajta", "Napos órák száma","Eső miliméterben", "Szüretelés időpontja", "Palackozás időpontja"]
export const dateFormats: string[] = 
["YYYY.MM.DD",
 "YYYY/MM/DD",
 "YYYY-MM-DD",
 "DD/MM/YYYY",
 "DD-MM-YYYY",
 "DD.MM.YYYY"];  

export const contractAdress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export type ContractAdress = typeof contractAdress
export type ABI = typeof BottleStoreABI
export const BottleStoreABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "bottles",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "bottleId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "typeOfGrape",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "giveBottle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ownersBottles",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "bottleId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "typeOfGrape",
            "type": "string"
          },
          {
            "internalType": "uint32[]",
            "name": "sunnyHours",
            "type": "uint32[]"
          },
          {
            "internalType": "uint32[]",
            "name": "rainMilimeters",
            "type": "uint32[]"
          },
          {
            "internalType": "string[]",
            "name": "timeOfHarvest",
            "type": "string[]"
          },
          {
            "internalType": "string[]",
            "name": "timeOfBottling",
            "type": "string[]"
          }
        ],
        "internalType": "struct BottleStore.Bottle[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_typeOfGrape",
        "type": "string"
      },
      {
        "internalType": "uint32[]",
        "name": "_sunnyHours",
        "type": "uint32[]"
      },
      {
        "internalType": "uint32[]",
        "name": "_rainMilimiters",
        "type": "uint32[]"
      },
      {
        "internalType": "string[]",
        "name": "_timeOfHarvest",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "_timeOfBottling",
        "type": "string[]"
      }
    ],
    "name": "registerBottle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_typeOfGrape",
        "type": "string"
      }
    ],
    "name": "registerBottle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "returnBottleByID",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "bottleId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "typeOfGrape",
            "type": "string"
          },
          {
            "internalType": "uint32[]",
            "name": "sunnyHours",
            "type": "uint32[]"
          },
          {
            "internalType": "uint32[]",
            "name": "rainMilimeters",
            "type": "uint32[]"
          },
          {
            "internalType": "string[]",
            "name": "timeOfHarvest",
            "type": "string[]"
          },
          {
            "internalType": "string[]",
            "name": "timeOfBottling",
            "type": "string[]"
          }
        ],
        "internalType": "struct BottleStore.Bottle",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "returnLastBottleID",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "_rainMilimeters",
        "type": "uint32"
      }
    ],
    "name": "updateRainMilimeters",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "_sunnyHours",
        "type": "uint32"
      }
    ],
    "name": "updateSunnyHours",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_timeOfBottling",
        "type": "string"
      }
    ],
    "name": "updateTimeOfBottling",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_timeOfHarvest",
        "type": "string"
      }
    ],
    "name": "updateTimeOfHarvest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]