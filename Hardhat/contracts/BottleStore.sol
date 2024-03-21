// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.24;

contract BottleStore{
    struct Bottle {
        address owner;
        uint256 bottleId;
        string typeOfGrape;
        uint256 sunnyHours;
        uint256 rainMilimeters;
        string timeOfHarvest;
        string timeOfBottling;
    }
    
    Bottle[] public bottles;

    
    //Registerhez
    function registerBottle(string memory _typeOfGrape) public {
        bottles.push(Bottle(msg.sender,bottles.length,_typeOfGrape,0,0,"M\u00e9g nem sz\u00fcretelt","M\u00e9g nem palackozott"));
    }

    function returnLastBottleID()public view returns (uint256){
        return bottles[bottles.length-1].bottleId;
    }

    
    
    
    //Checkhez, updatehez
    function returnBottleByID(uint256 _id)public view returns (Bottle memory){
        return bottles[_id];
    }

    //Checkhez
    function ownersBottles() public view returns (Bottle[] memory){
        uint count=0;
        for (uint i = 0; i < bottles.length; i++) {
            if (bottles[i].owner == msg.sender) {
               count++;
            }
        }

        Bottle[] memory tempBottles = new Bottle[](count);
        uint tempCount=0;
        for (uint i = 0; i < bottles.length; i++) {
            if (bottles[i].owner == msg.sender) {
                tempBottles[tempCount]=bottles[i];
                tempCount++;
            }
        }

        return tempBottles;
    }

    //Updatehez

    function updateSunnyHours(uint256 _id, uint256 _sunnyHours) public {
        require(bottles[_id].owner == msg.sender, "Csak saj\u00E1t \u00FCveget friss\u00EDthetsz!"); //Unicode karakterek
        require(bottles[_id].sunnyHours==0, 
        "Ha egyszer meg lett adva a naps\\u00FCt\\u00E9ses \\u00F3r\\u00E1k sz\\u00E1ma, nem lehet friss\\u00EDteni!");
        bottles[_id].sunnyHours=_sunnyHours;
    }

    function updateRainMilimeters(uint256 _id, uint256 _rainMilimeters) public {
        require(bottles[_id].owner == msg.sender, "Csak saj\u00E1t \u00FCveget friss\u00EDthetsz!");
        require(bottles[_id].rainMilimeters==0, 
        "Ha egyszer meg lett adva az es\\u0151 mennyis\\u00E9ge, nem lehet friss\\u00EDteni!");
        bottles[_id].rainMilimeters=_rainMilimeters;
    }

    function updateTimeOfHarvest(uint256 _id, string memory _timeOfHarvest) public {
        require(bottles[_id].owner == msg.sender, "Csak saj\u00E1t \u00FCveget friss\u00EDthetsz!");
        require(keccak256(abi.encodePacked(bottles[_id].timeOfHarvest)) == keccak256(abi.encodePacked("M\u00e9g nem sz\u00fcretelt")), 
        "Ha egyszer meg lett adva a sz\\u00FCret ideje, nem lehet friss\\u00EDteni!");
        bottles[_id].timeOfHarvest=_timeOfHarvest;
    }

    function updateTimeOfBottling(uint256 _id, string memory _timeOfBottling) public {
        require(bottles[_id].owner == msg.sender, "Csak saj\u00E1t \u00FCveget friss\u00EDthetsz!");
        require(keccak256(abi.encodePacked(bottles[_id].timeOfBottling)) == keccak256(abi.encodePacked("M\u00e9g nem palackozott")), 
        "Ha egyszer meg lett adva a palackoz\\u00E1s ideje, nem lehet friss\\u00EDteni!");
        bottles[_id].timeOfBottling=_timeOfBottling;
    }


}