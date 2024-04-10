const { expect } = require('chai');
const { ethers } = require('hardhat');


describe('BottleStore contract with Gas Reporter', () => {
  let contract;
  const grapeType = 'Chardonnay';
  const sunnyHours = 650;
  const rainMilimeters = 700;
  const timeOfHarvest = "2023.09.01";
  const timeOfBottling = "2024.06.01";


  beforeEach(async () => {
    
    contract =await ethers.deployContract("BottleStore");
    await contract.waitForDeployment();
  });

  describe('registerBottle', () => {
    it('registers a new bottle', async () => {
      await contract.registerBottle(grapeType);
      const firstBottleId = await contract.returnLastBottleID();  
      const bottle = await contract.returnBottleByID(firstBottleId);

      expect(bottle.typeOfGrape).to.equal(grapeType);

      await contract.registerBottle(grapeType,[sunnyHours],[rainMilimeters],[timeOfHarvest],[timeOfBottling]);
      const secondBottleId = await contract.returnLastBottleID();
      const bottle2 = await contract.returnBottleByID(secondBottleId);

      expect(bottle2.typeOfGrape).to.equal(grapeType);
      expect(bottle2.sunnyHours[0]).to.equal(sunnyHours);
      expect(bottle2.rainMilimeters[0]).to.equal(rainMilimeters);
      expect(bottle2.timeOfHarvest[0]).to.equal(timeOfHarvest);
      expect(bottle2.timeOfBottling[0]).to.equal(timeOfBottling);


    });
  });

  describe('returnLastBottleID', () => {
    it('returns the ID of the last bottle', async () => {
      await contract.registerBottle(grapeType);
      const lastBottleId = await contract.returnLastBottleID();
      expect(lastBottleId).to.be.equal(0);
    });
  });

  describe('returnBottleByID', () => {
    it('returns bottle information by ID', async () => {
      await contract.registerBottle(grapeType);
      const firstBottleId = await contract.returnLastBottleID();
      const bottle = await contract.returnBottleByID(firstBottleId);

      expect(bottle.typeOfGrape).to.equal(grapeType);
    });
  });

  describe('ownersBottles', () => {
    it('returns all bottles owned by the caller', async () => {
      const grapeType1 = 'Cuvéé';
      const grapeType2 = 'Irsai';

      await contract.registerBottle(grapeType1);
      await contract.registerBottle(grapeType2);

      const ownedBottles = await contract.ownersBottles();
      
      expect(ownedBottles[0]).to.be.an('array');
      
      expect(ownedBottles[0].typeOfGrape).to.equal(grapeType1);
      expect(ownedBottles[1].typeOfGrape).to.equal(grapeType2);
    });
  });


  describe('updateSunnyHours', () => {
    it('updates sunny hours for a bottle', async () => {
    
        await contract.registerBottle(grapeType);
        const firstBottleId = await contract.returnLastBottleID();
        await contract.updateSunnyHours(parseInt(firstBottleId), sunnyHours);
        let bottle=await contract.returnBottleByID(parseInt(firstBottleId));
        
    
        expect(bottle.sunnyHours[1]).to.equal(sunnyHours);
    });
  });

  describe('updateRainMilimeters', () => {
    it('updates rain milimeters for a bottle', async () => {
    
        await contract.registerBottle(grapeType);
        const firstBottleId = await contract.returnLastBottleID();
        await contract.updateRainMilimeters(parseInt(firstBottleId), rainMilimeters);
        let bottle=await contract.returnBottleByID(parseInt(firstBottleId));
    
        expect(bottle.rainMilimeters[1]).to.equal(rainMilimeters);
    });
  });

    describe('updateTimeOfHarvest', () => {
      it('updates time of harvest for a bottle', async () => {
      
          await contract.registerBottle(grapeType);
          const firstBottleId = await contract.returnLastBottleID();
          await contract.updateTimeOfHarvest(parseInt(firstBottleId), timeOfHarvest);
          let bottle=await contract.returnBottleByID(parseInt(firstBottleId));
      
          expect(bottle.timeOfHarvest[1]).to.equal(timeOfHarvest);
      });
    });

    describe('updateTimeOfBottling', () => {
      it('updates time of bottling for a bottle', async () => {
      
          await contract.registerBottle(grapeType);
          const firstBottleId = await contract.returnLastBottleID();
          await contract.updateTimeOfBottling(parseInt(firstBottleId), timeOfBottling);
          let bottle=await contract.returnBottleByID(parseInt(firstBottleId));
      
          expect(bottle.timeOfBottling[1]).to.equal(timeOfBottling);
      });

    });


    describe('updateOwnership', () => {
      it('transfers ownership of a bottle', async () => {

        await contract.registerBottle(grapeType);
        const firstBottleId = await contract.returnLastBottleID();

        let bottle = await contract.returnBottleByID(firstBottleId);
        const originalOwner = bottle.owner;

        const newOwner = ethers.Wallet.createRandom().address;

        await contract.giveBottle(firstBottleId, newOwner);
        bottle = await contract.returnBottleByID(firstBottleId);

        expect(bottle.owner).to.equal(newOwner);
        expect(bottle.owner).to.not.equal(originalOwner);
      
        
      });
    });
});
