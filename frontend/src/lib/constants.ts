export const headerArray = ["Üveg Azonosító", "Szőlő fajta", "Napos órák száma", "Szüretelés időpontja", "Palackozás időpontja"]
export const factoryContractAdress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export type ContractAdress = typeof factoryContractAdress
export type ABI = typeof factoryAbi
export const factoryAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bottleContracts",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
		"name": "createBottle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBottleCount",
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
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "returnBottle",
		"outputs": [
			{
				"internalType": "contract Bottle",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "returnLastBottle",
		"outputs": [
			{
				"internalType": "contract Bottle",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const bottleAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_typeOfGrape",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_bottleID",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getAmountOfSunnyHours",
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
		"inputs": [],
		"name": "getBottleID",
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
		"inputs": [],
		"name": "getTimeOfBottling",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTimeOfHarvest",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTypeOfGrape",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_timeOfBottling",
				"type": "string"
			}
		],
		"name": "updateBottling",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_timeOfHarvest",
				"type": "string"
			}
		],
		"name": "updateHarvest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountOfSunnyHours",
				"type": "uint256"
			}
		],
		"name": "updateHours",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]