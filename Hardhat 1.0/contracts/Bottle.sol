pragma solidity 0.8.24;

contract Bottle  {
    string typeOfGrape;
    uint256 bottleID;
    uint256 amountOfSunnyHours=0;
    string timeOfHarvest ="Not harvested yet";
    string timeOfBottling="Not bottled yet";

    constructor(string memory _typeOfGrape, uint256 _bottleID) {
        typeOfGrape = _typeOfGrape;
        bottleID =_bottleID;
    }

    function updateHours(uint256 _amountOfSunnyHours) public {
        //require(_amountOfSunnyHours==amountOfSunnyHours);
        amountOfSunnyHours = _amountOfSunnyHours;
    }
    function updateHarvest(string memory _timeOfHarvest) public  {
        //require((keccak256(abi.encodePacked((_timeOfHarvest))) == keccak256(abi.encodePacked((timeOfHarvest)))));
        timeOfHarvest = _timeOfHarvest;
    }
    function updateBottling(string memory _timeOfBottling) public  {
       // require((keccak256(abi.encodePacked((_timeOfBottling))) == keccak256(abi.encodePacked((timeOfBottling)))));
        timeOfBottling = _timeOfBottling;
    } 
    
    function getTypeOfGrape() public view returns (string memory) { return typeOfGrape;}
    function getBottleID() public view returns (uint256) {  return bottleID;  }
    function getAmountOfSunnyHours() public view returns (uint256) {    return amountOfSunnyHours;  }
    function getTimeOfHarvest() public view returns (string memory) {    return timeOfHarvest;  }
    function getTimeOfBottling() public view returns (string memory) {    return timeOfBottling;  }
}