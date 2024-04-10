<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Alert from "$lib/components/ui/alert";
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Table from "$lib/components/ui/table";


    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";

    import { defaultEvmStores as evm, connected } from "ethers-svelte";
    import { ethers } from "ethers";
    import { isAddress } from 'web3-validator';

    import {
        contractAdress,
        BottleStoreABI,
        headerArray,

    } from "$lib/constants";

    import RowCentered from "$lib/RowCentered.svelte";
    import ColCentered from "$lib/ColCentered.svelte";
    import BottleImage from "$lib/assets/Wine BottleSmall.png";

    
    let provider: ethers.BrowserProvider
    let signer: ethers.JsonRpcSigner
    let BottleStore: ethers.Contract

    let dialogOpen = false;
    let infoArray: Writable<any[]> = writable([]);
    let gotID = writable(false);
    let noSuchID:boolean = false;
    
    let currentOwner:string ="";
    let newOwner: string = "";
    let successFullTransaction = false;


    let ID: number;
    let bottleID: number;
    let typeOfGrape: string;
    let sunnyHours: number[];
    let rainMilimeters: number[];
    let timeOfHarvest: string[];
    let timeOfBottling: string[];

        
    // let tmpSunnyHours: number;
    // let tmpRainMilimeters: number;
    // let tmpTimeOfHarvest: string;
    // let tmpTimeOfBottling: string;

    async function getID() {
        try{
            let temp= await BottleStore.returnBottleByID(ID)
            bottleID = temp.bottleId;
            typeOfGrape = temp.typeOfGrape;
            sunnyHours = temp.sunnyHours;
            rainMilimeters = temp.rainMilimeters;
            timeOfHarvest = temp.timeOfHarvest;
            timeOfBottling = temp.timeOfBottling;

            // tmpSunnyHours = sunnyHours[sunnyHours.length-1];
            // tmpRainMilimeters = rainMilimeters[rainMilimeters.length-1];
            // tmpTimeOfHarvest = timeOfHarvest[timeOfHarvest.length-1];
            // tmpTimeOfBottling = timeOfBottling[timeOfBottling.length-1];


            $gotID = true;

            infoArray.set([
                bottleID,
                typeOfGrape,
                sunnyHours,
                rainMilimeters,
                timeOfHarvest,
                timeOfBottling


            
            ]);
            currentOwner=temp.owner;

        }catch(error:any){
            console.log(error.reason)
            if (error.reason=="Panic due to ARRAY_RANGE_ERROR(50)"){
                noSuchID=true;
            }
        }
    }


    async function updateOwner(){
        const tx = await BottleStore.giveBottle(ID,newOwner)
        const receipt = await (tx as any).wait();
        if (receipt.status === 1) {
            successFullTransaction=true;
            console.log("Transaction successful!");
            dialogOpen = false;
        } else {
            console.error("Transaction failed:", receipt);
        }
        
    }

 
    async function connectWallet() {
        await evm.setProvider();
    }

    async function connectContract() {
        provider = new ethers.BrowserProvider((window as any).ethereum);
        signer = await provider.getSigner();
        BottleStore = new ethers.Contract(
            contractAdress,
            BottleStoreABI,
            signer,
        );
    }


    async function connect(){
        await connectWallet();
        await connectContract();
    }

    onMount(async () => {
       await connect();
    });

</script>


{#if !$connected}
    <ColCentered>
        <Alert.Root class="w-3/4 p-8">
            <Alert.Title class="text-5xl text-slate-400"
                >Kérlek csatlakoztasd az ethereum pénztárcád!</Alert.Title
            >
            <Alert.Description class="text-2xl text-slate-400">
                Csatlakozás nélkül nem tudsz interaktálni a blokklánccal.
            </Alert.Description>
        </Alert.Root>
        <Button
            class="text-4xl text-slate-600 m-10 p-10"
            on:click={connectWallet}>Connect</Button
        >
    </ColCentered>
{:else}
    <RowCentered>
        <div class="flex justify-center items-center">
            <img
                class="w-4/6 h-4/6 object-contain"
                src={BottleImage}
                alt="Wine Bottle"
            />
        </div>
        <Card.Root
            class="bg-slate-900 w-full sm:w-2/4 md:w-1/2 lg:w-1/3 h-fit ml-20 mr-20"
        >
            <Card.Header>
                <Card.Title class="text-4xl"
                    >Üveg tulajdonjogának átadása</Card.Title
                >
                <Card.Description class="text-base">
                    Üveg kiválasztásával, majd blokklánc cím megadásával átruházhatja a tulajdonjogot az ön által regisztrált üvegek esetén egy másik címre, az üveg eladásához.
                </Card.Description>
            </Card.Header>

            <Card.Content>
                {#if !$gotID}
                    <Label>Üveg azonosítója</Label>
                    <Input type="number" bind:value={ID} />
                    <Button on:click={getID} class="mt-2 w-full font-medium text-lg"
                        >Üveg lekérése</Button
                    >
                    {#if noSuchID}
                    <Alert.Root class="text-center mt-1 mb-1"> 
                        <Alert.Title class="text-2xl text-slate-400">Nincs ilyen azonosítóval rendelkező üveg!</Alert.Title>
                    </Alert.Root> 
                    {/if}
                {:else}
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                {#each headerArray as header}
                                    <Table.Cell class="text-center"
                                        >{header}</Table.Cell
                                    >
                                {/each}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row class="text-center">
                                {#each $infoArray as info}
                                    <Table.Cell>{info}</Table.Cell>
                                {/each}
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                
                    <div>
                        <Label>Jelenlegi tulajdonos:</Label>
                        {currentOwner}
                    </div>
                   <div>
                        <Label>Új tulajdonos címe</Label>
                        <Input type="string" bind:value={newOwner} />
                   </div>
                   
  
                    <Dialog.Root bind:open={dialogOpen}>
                        
                            <Dialog.Trigger class="mt-2 p-1 w-full text-slate-800 font-medium text-lg bg-white rounded-sm" >Tulajdonjog átruházás</Dialog.Trigger>
                            <Dialog.Content class="max-w-2xl w-1/2 bg-slate-900">
                                
                                <Dialog.Header>

                                    {#if (!isAddress(newOwner))}
                                        <div class="mt-2 mb-2 text-3xl text-center">Nem megfelelő Ethereum  cím!</div>
                                    {:else}
                                        <Dialog.Title class="text-2xl">Biztosan ennyi napsütéses órával szeretnéd frissíteni az üveget?</Dialog.Title>
                                            
                                        <div class="mt-2 mb-2 text-2xl text-destructive"> Új tulajdonosa az üvegnek: {newOwner}</div>
                                        
                                        <Dialog.Description class="text-lg">
                                            Ez a művelet visszafordíthatatlan és költségekkel jár!
                                        </Dialog.Description>    

                                        <Button on:click={updateOwner} class="mt-2 w-full">Tulajdonjog átadása</Button>

                                    {/if} 

                                </Dialog.Header>
        
                            </Dialog.Content>
                           
                    </Dialog.Root>

                    {#if successFullTransaction}
                        <div class="flex justify-center items-center">
                            <Alert.Root class="w-full h-1/2 mt-5">
                                <Alert.Title class="text-2xl text-slate-400"
                                    >Sikeres tulajdonjogváltás!</Alert.Title
                                >
                                <Alert.Description class="text-1xl text-slate-400">
                                    Az üveg sikeresen átadásra került az új tulajdonosnak!
                                    <div>Az alábbi címről: {currentOwner}</div>
                                    <div>Az alábbi címre: {newOwner}</div>
                                </Alert.Description>
                            </Alert.Root>
                        </div>
                    {/if}

                    <Button on:click={() => $gotID = false} class="w-full mt-5 font-medium text-lg" >Másik üveg jogának átadása</Button>
                    
                {/if}

            </Card.Content>

            <Card.Footer class="block">
                
                
                <div class="text-xl text-center text-slate-400">
                  Nem tulajdonjogot szeretnél átruházni?
                </div>

                <div class="flex justify-evenly">
                    <Button class="text-xl mt-1 " variant="link" href="/register"
                        >Regisztráció</Button>
                    <Button class="text-xl mt-1 " variant="link" href="/check"
                        >Ellenőrzés</Button
                    >
                    <Button class="text-xl mt-1" variant="link" href="/update"
                        >Frissítés</Button
                    >
                </div>
            </Card.Footer>
        </Card.Root>

        <div class="flex justify-center items-center">
            <img
                class="w-4/6 h-4/6 object-contain"
                src={BottleImage}
                alt="Wine Bottle"
            />
        </div>
        
    </RowCentered>
{/if}
