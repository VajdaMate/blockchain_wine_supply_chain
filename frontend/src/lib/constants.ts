export const headerArray = ["Üveg Azonosító", "Szőlő fajta", "Napos órák száma","Eső miliméterben", "Szüretelés időpontja", "Palackozás időpontja"]
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
        },
        {
          "internalType": "uint256",
          "name": "sunnyHours",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rainMilimeters",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "timeOfHarvest",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "timeOfBottling",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
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
              "internalType": "uint256",
              "name": "sunnyHours",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rainMilimeters",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "timeOfHarvest",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "timeOfBottling",
              "type": "string"
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
              "internalType": "uint256",
              "name": "sunnyHours",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rainMilimeters",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "timeOfHarvest",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "timeOfBottling",
              "type": "string"
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
          "internalType": "uint256",
          "name": "_rainMilimeters",
          "type": "uint256"
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
          "internalType": "uint256",
          "name": "_sunnyHours",
          "type": "uint256"
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