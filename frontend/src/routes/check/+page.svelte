<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Alert from "$lib/components/ui/alert";
    import * as Table from "$lib/components/ui/table";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Input} from "$lib/components/ui/input";
    
    import { onMount } from "svelte"
    
    import { defaultEvmStores,connected,} from "ethers-svelte"
    import { ethers } from "ethers";

    import RowCentered from '$lib/RowCentered.svelte'; 
    import ColCentered from "$lib/ColCentered.svelte";
    import BottleImage from '$lib/assets/Wine BottleSmall.png'
    import {factoryContractAdress, factoryAbi, bottleAbi,headerArray} from '$lib/constants'
    import { writable, type Writable } from "svelte/store";


    class BottleInfo {
        bottleID: number;
        typeOfGrape: string;
        sunnyHours: number;
        timeOfHarvest: string;
        timeOfBottling: string;
        constructor(bottleID:number,typeOfGrape:string,sunnyHours:number,timeOfHarvest:string,timeOfBottling:string){
            this.bottleID=bottleID;
            this.typeOfGrape=typeOfGrape;
            this.sunnyHours=sunnyHours;
            this.timeOfHarvest=timeOfHarvest;
            this.timeOfBottling=timeOfBottling;
        }
    }
    let ID:number;
    const bottles: Writable<BottleInfo[]> = writable([]);

    let provider;
    let signer;
    let factoryContract;
    let contractAddress;
    let contract:any;


    async function submitForm() {
        provider = new ethers.BrowserProvider((window as any).ethereum)
        signer = await provider.getSigner();
        factoryContract = new ethers.Contract(factoryContractAdress,factoryAbi,provider)
        contractAddress=await factoryContract.returnBottle(ID)  
        contract=new ethers.Contract(contractAddress,bottleAbi,signer)
        console.log(contractAddress)
        
        let bottleID= await contract.getBottleID();
        let typeOfGrape= await contract.getTypeOfGrape()
        let sunnyHours=await contract.getAmountOfSunnyHours();
        let timeOfHarvest= await contract.getTimeOfHarvest();
        let timeOfBottling= await contract.getTimeOfBottling();
        let bottle=new BottleInfo(bottleID,typeOfGrape,sunnyHours,timeOfHarvest,timeOfBottling)
            // Update the bottles store using update function
        bottles.update((currentBottles) => {
            if (currentBottles.some(b => b.bottleID === bottleID)) {
                return currentBottles;  // ID already exists, don't add
            } 
            else {
            return [...currentBottles, bottle];  // Add the new bottle
            }
            });
    }

    async function connectWallet() {
        await defaultEvmStores.setProvider()
       
    }
    onMount(() => {
        connectWallet()
    })

    
</script>



{#if !$connected}

<ColCentered>
    <Alert.Root class="w-3/4 p-8" >
            <Alert.Title class="text-5xl text-slate-400">Kérlek csatlakoztasd az ethereum pénztárcád!</Alert.Title>
            <Alert.Description class="text-2xl text-slate-400">
            Csatlakozás nélkül nem tudsz interaktálni a blokklánccal.
            </Alert.Description>
    </Alert.Root>
    <Button class="text-4xl text-slate-600 m-10 p-10" on:click={connectWallet}>Connect</Button>
</ColCentered>

{:else}


<RowCentered >
    <div class="flex justify-center items-center">
        <img class="w-4/6 h-4/6 object-contain" src={BottleImage} alt="Wine Bottle" />
    </div>
    
    <Card.Root class="bg-slate-900 w-full sm:w-2/4 md:w-1/2 lg:w-1/3 h-5/6 ml-20 mr-20">
        <Card.Header>
            <Card.Title class="text-4xl mb-2">Ellenőrizd egy üveg eredetiségét!</Card.Title>
            
            <Card.Description class="text-base">
            Le tudod ellenőrizni az üveged eredetiségét, az üveg azonosítójának segítségével, mely után minden rögzített adatot megtekinthetsz az üvegről.
            </Card.Description>
        
        </Card.Header>  

        <Card.Content class="h-4/6">
            <form>
                <Label>Üveg azonosítója</Label>
                <Input type="number" bind:value={ID}/>
                <Button on:click={submitForm} class="mt-2 w-full">Üveg lekérése</Button>
            </form>

            <div class="overflow-y-scroll h-4/5">
                <Table.Root class="">
                    <Table.Header>
                    <Table.Row>
                        {#each headerArray as header}
                                <Table.Cell class="text-center" >{header}</Table.Cell>
                        {/each}
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {#each $bottles as bottle}
                        <Table.Row>
                            <Table.Cell >{bottle.bottleID}</Table.Cell>
                            <Table.Cell>{bottle.typeOfGrape}</Table.Cell>
                            <Table.Cell>{bottle.sunnyHours}</Table.Cell>
                            <Table.Cell >{bottle.timeOfHarvest}</Table.Cell>
                            <Table.Cell >{bottle.timeOfBottling}</Table.Cell>
                        </Table.Row>
                        {/each}
                    </Table.Body>
                </Table.Root>
            </div>
        </Card.Content>
        
        
        <Card.Footer class="block">
            <div class="text-xl text-center text-slate-400">
                Még nem regiszráltál üveget, vagy frissíteni szeretnéd?
           </div>
           <div class="flex justify-evenly">
               <Button class="text-xl mt-1 " variant="link" href="/register">Regisztráció</Button> 
               <Button class="text-xl mt-1" variant="link" href="/update">Frissítés</Button> 
           </div>
        </Card.Footer>
    </Card.Root>
    
    <div class="flex justify-center items-center">
        <img class="w-4/6 h-4/6 object-contain" src={BottleImage} alt="Wine Bottle" />
    </div>

</RowCentered>

{/if}