// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.24;

import "./Bottle.sol";

contract BottleFactory{
    address[] public bottleContracts;

    function createBottle(string memory _typeOfGrape) public {
        address newBottle = address(new Bottle(_typeOfGrape,bottleContracts.length));
        bottleContracts.push(newBottle);
    }

    function getBottleCount() public view returns (uint256) { 
        return bottleContracts.length;
    }

    function returnLastBottle()public view returns (Bottle){
        return Bottle(bottleContracts[bottleContracts.length-1]); 
    }

    
    function returnBottle(uint256 _index)public view returns (Bottle){
        return Bottle(bottleContracts[_index]); 
    }
}