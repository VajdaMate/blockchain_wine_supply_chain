const { expect } = require('chai');
const { ethers } = require('hardhat');


describe('BottleStore contract with Gas Reporter', () => {
  let contract;
  let deployer;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    contract =await ethers.deployContract("BottleStore");
    await contract.waitForDeployment();
  });

  describe('registerBottle', () => {
    it('registers a new bottle', async () => {
      const grapeType = 'Sauvignon Blanc';
      await contract.registerBottle(grapeType);
      const firstBottleId = await contract.returnLastBottleID();  
      const bottle = await contract.returnBottleByID(firstBottleId);


      expect(bottle.typeOfGrape).to.equal(grapeType);
    });
  });

  describe('returnLastBottleID', () => {
    it('returns the ID of the last bottle', async () => {
      const grapeType = 'Tempranillo';
      await contract.registerBottle(grapeType);
      const lastBottleId = await contract.returnLastBottleID();
      expect(lastBottleId).to.be.equal(0);
    });
  });

  describe('returnBottleByID', () => {
    it('returns bottle information by ID', async () => {
      const grapeType = 'Malbec';

      await contract.registerBottle(grapeType);
      const firstBottleId = await contract.returnLastBottleID();
      const bottle = await contract.returnBottleByID(firstBottleId);

      expect(bottle.typeOfGrape).to.equal(grapeType);
    });
  });

  describe('ownersBottles', () => {
    it('returns all bottles owned by the caller', async () => {
      const grapeType1 = 'Carmenere';
      const grapeType2 = 'Grenache';

      await contract.registerBottle(grapeType1);
      await contract.registerBottle(grapeType2);

      const ownedBottles = await contract.ownersBottles();
      expect(ownedBottles).to.be.an('array');
    });
  });

  describe('updateSunnyHours', () => {
    it('updates sunny hours for a bottle', async () => {
        const grapeType = 'Chardonnay';
        const sunnyHours = 10;
    
        await contract.registerBottle(grapeType);
        const firstBottleId = await contract.returnLastBottleID();
        await contract.updateSunnyHours(parseInt(firstBottleId), sunnyHours);
        let bottle=await contract.returnBottleByID(parseInt(firstBottleId));
        
    
        expect(bottle.sunnyHours).to.equal(sunnyHours);
    });
  });

  describe('updateRainMilimeters', () => {
    it('updates rain milimeters for a bottle', async () => {
        const grapeType = 'Pinot Noir';
        const rainMilimeters = 20;
    
        await contract.registerBottle(grapeType);
        const firstBottleId = await contract.returnLastBottleID();
        await contract.updateRainMilimeters(parseInt(firstBottleId), rainMilimeters);
        let bottle=await contract.returnBottleByID(parseInt(firstBottleId));
    
        expect(bottle.rainMilimeters).to.equal(rainMilimeters);
    });
  });

    describe('updateTimeOfHarvest', () => {
        it('updates time of harvest for a bottle', async () => {
            const grapeType = 'Merlot';
            const timeOfHarvest = "2022";
        
            await contract.registerBottle(grapeType);
            const firstBottleId = await contract.returnLastBottleID();
            await contract.updateTimeOfHarvest(parseInt(firstBottleId), timeOfHarvest);
            let bottle=await contract.returnBottleByID(parseInt(firstBottleId));
        
            expect(bottle.timeOfHarvest).to.equal(timeOfHarvest);
        });
    });

    describe('updateTimeOfBottling', () => {
        it('updates time of bottling for a bottle', async () => {
            const grapeType = 'Syrah';
            const timeOfBottling = "2023";
        
            await contract.registerBottle(grapeType);
            const firstBottleId = await contract.returnLastBottleID();
            await contract.updateTimeOfBottling(parseInt(firstBottleId), timeOfBottling);
            let bottle=await contract.returnBottleByID(parseInt(firstBottleId));
        
            expect(bottle.timeOfBottling).to.equal(timeOfBottling);
        });

    });
});
