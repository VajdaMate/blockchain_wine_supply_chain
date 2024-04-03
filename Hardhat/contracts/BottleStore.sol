// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.24;

contract BottleStore{
    struct Bottle {
        address owner;
        uint256 bottleId;
        string typeOfGrape;
        uint32[] sunnyHours;
        uint32[] rainMilimeters;
        string[] timeOfHarvest;
        string[] timeOfBottling;
    }
    
    Bottle[] public bottles;

    
    //Registerhez
    function registerBottle(string memory _typeOfGrape) public {
        uint32[] memory tmpSunny = new uint32[](1); 
        tmpSunny[0] = 0;
        uint32[] memory tmpRain = new uint32[](1);
        tmpRain[0] = 0;
        string[] memory tmpTimeOfHarvest = new string[](1);
        tmpTimeOfHarvest[0] = "M\u00e9g nem sz\u00fcretelt";
        string[] memory tmpTimeOfBottling = new string[](1);
        tmpTimeOfBottling[0] = "M\u00e9g nem palackozott";

        bottles.push(Bottle(msg.sender,bottles.length,_typeOfGrape,tmpSunny,tmpRain,tmpTimeOfHarvest,tmpTimeOfBottling));
    }

    function registerBottle(
        string memory _typeOfGrape, uint32[] memory _sunnyHours, uint32[] memory _rainMilimiters, string[] memory _timeOfHarvest, string[] memory _timeOfBottling) public 
    {
        bottles.push(Bottle(msg.sender,bottles.length,_typeOfGrape,_sunnyHours,_rainMilimiters,_timeOfHarvest,_timeOfBottling));
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

    function updateSunnyHours(uint256 _id, uint32 _sunnyHours) public {
        require(bottles[_id].owner == msg.sender, "Csak saj\u00E1t \u00FCveget friss\u00EDthetsz!"); //Unicode karakterek
        
        bottles[_id].sunnyHours.push(_sunnyHours);
    }

    function updateRainMilimeters(uint256 _id, uint32 _rainMilimeters) public {
        require(bottles[_id].owner == msg.sender, "Csak saj\u00E1t \u00FCveget friss\u00EDthetsz!");
       
        bottles[_id].rainMilimeters.push(_rainMilimeters);
    }

    function updateTimeOfHarvest(uint256 _id, string memory _timeOfHarvest) public {
        require(bottles[_id].owner == msg.sender, "Csak saj\u00E1t \u00FCveget friss\u00EDthetsz!");
        bottles[_id].timeOfHarvest.push(_timeOfHarvest);
    }

    function updateTimeOfBottling(uint256 _id, string memory _timeOfBottling) public {
        require(bottles[_id].owner == msg.sender, "Csak saj\u00E1t \u00FCveget friss\u00EDthetsz!");
      
        bottles[_id].timeOfBottling.push(_timeOfBottling);
    }


    //Tulajváltás
    function giveBottle(uint256 _id, address _newOwner) public {
        require(bottles[_id].owner == msg.sender, "Csak saj\u00E1t \u00FCveget adhatsz!");
        bottles[_id].owner = _newOwner;
    }


}