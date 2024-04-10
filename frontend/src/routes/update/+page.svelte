<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Alert from "$lib/components/ui/alert";
    import * as Table from "$lib/components/ui/table";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
    import * as Dialog from "$lib/components/ui/dialog";

    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import { defaultEvmStores as evm, connected } from "ethers-svelte";
    import moment from "moment";

    import { ethers } from "ethers";

    import {
        contractAdress,
        BottleStoreABI,
        headerArray,
    } from "$lib/constants";

   
    import RowCentered from "$lib/RowCentered.svelte";
    import ColCentered from "$lib/ColCentered.svelte";
    import BottleImage from "$lib/assets/Wine BottleSmall.png";


    let bottleID: number;
    let typeOfGrape: string;
    let sunnyHours: number[];
    let rainMilimeters: number[];
    let timeOfHarvest: string[];
    let timeOfBottling: string[];
    
    let tmpSunnyHours: number;
    let tmpRainMilimeters: number;
    let tmpTimeOfHarvest: string;
    let tmpTimeOfBottling: string;
    let bottleAddress: string;


    let ID: number;
    let infoArray: Writable<any[]> = writable([]);
    let gotID = writable(false);

    let provider: ethers.BrowserProvider
    let signer: ethers.JsonRpcSigner
    let BottleStore: ethers.Contract
    let address:string


    let sunnyDialogOpen:boolean = false;
    let rainDialogOpen:boolean = false;
    let harvestDialogOpen:boolean = false;
    let bottlingDialogOpen:boolean = false;

    let noSuchID:boolean = false;

    import { dateFormats } from "$lib/constants";


    async function getID() {
        try{
            let temp= await BottleStore.returnBottleByID(ID)
            bottleID = temp.bottleId;
            typeOfGrape = temp.typeOfGrape;
            sunnyHours = temp.sunnyHours;
            rainMilimeters = temp.rainMilimeters;
            timeOfHarvest = temp.timeOfHarvest;
            timeOfBottling = temp.timeOfBottling;
            bottleAddress = temp.adress;

            tmpSunnyHours = sunnyHours[sunnyHours.length-1];
            tmpRainMilimeters = rainMilimeters[rainMilimeters.length-1];
            tmpTimeOfHarvest = timeOfHarvest[timeOfHarvest.length-1];
            tmpTimeOfBottling = timeOfBottling[timeOfBottling.length-1];
            

            $gotID = true;

            infoArray.set([
                bottleID,
                typeOfGrape,
                sunnyHours,
                rainMilimeters,
                timeOfHarvest,
                timeOfBottling
            ]);

        }catch(error:any){
            console.log(error.reason)
            if (error.reason=="Panic due to ARRAY_RANGE_ERROR(50)"){
                noSuchID=true;
            }
        }
    }

    async function sunnyUpdate() {
        const tx = await BottleStore.updateSunnyHours(ID,tmpSunnyHours);
        const success = await (tx as any).wait();
        if (success.status === 1) {
            sunnyHours = [...sunnyHours, tmpSunnyHours];
            $infoArray[2] = sunnyHours;
            console.log("Successfully updated!");
            sunnyDialogOpen = false;
        } else {
            console.error("Transaction failed:", success);
        }
        
    }

    async function rainUpdate() {
        const tx = await BottleStore.updateRainMilimeters(ID,tmpRainMilimeters);
        const success = await (tx as any).wait();
        if (success.status === 1) {
            rainMilimeters= [...rainMilimeters, tmpRainMilimeters];
            $infoArray[3] = rainMilimeters;
            console.log("Successfully updated!");
        } else {
            console.error("Transaction failed:", success);
        }
        rainDialogOpen = false;
        
    }

    async function harvestUpdate() {
        const tx = await BottleStore.updateTimeOfHarvest(ID,tmpTimeOfHarvest);

        const success = await (tx as any).wait();
        if (success.status === 1) {
            timeOfHarvest= [...timeOfHarvest, tmpTimeOfHarvest];
            $infoArray[4] = timeOfHarvest;
            console.log("Successfully updated!");
        } else {
            console.error("Transaction failed:", success);
        }
        harvestDialogOpen = false;
    }
    async function bottlingUpdate() {
        const tx = await BottleStore.updateTimeOfBottling(ID,tmpTimeOfBottling);

        const success = await (tx as any).wait();
        if (success.status === 1) {
            timeOfBottling= [...timeOfBottling, tmpTimeOfBottling];
            $infoArray[5] = timeOfBottling;
            console.log("Successfully updated!");
        } else {
            console.error("Transaction failed:", success);
        }
        bottlingDialogOpen = false;
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
        address = await signer.getAddress();
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
            class="bg-slate-900 w-full h-fit w-min-fit sm:w-2/4 md:w-1/2 lg:w-1/3 ml-20 mr-20" 
        >
            <Card.Header class="">
                <Card.Title class="text-4xl mb"
                    >Frissítsd egy üveg adatait</Card.Title
                >
                <Card.Description class="text-base">
                    Adja meg az üveg azonosítóját, hogy frissíthesse azon
                    adatokat, melyek változhatnak.
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
                     
                    <Label>Napsütéses órák száma</Label>
                    <div class="flex">
                        <Input type="number" bind:value={tmpSunnyHours} />
                        
                        <Dialog.Root bind:open={sunnyDialogOpen}>
                            <Dialog.Trigger class="ml-1 px-3 text-slate-800 font-semibold text-base bg-white rounded-md" >Frissítés</Dialog.Trigger>
                            <Dialog.Content class="max-w-2xl w-1/2 bg-slate-900">
                                
                                <Dialog.Header class="mt-4 mb-3">
                                    {#if (bottleAddress!=address)}

                                        <div class="mt-2 mb-2 text-3xl text-center">Csak saját üveget frissíthetsz!</div>
                                    
                                    {:else if (tmpSunnyHours==sunnyHours[sunnyHours.length-1])}
                                        
                                        <div class="mt-2 mb-2 text-3xl text-center">Adja meg az új napsütéses óra számot!</div>
                                    
                                    {:else if (tmpSunnyHours < 1000 )}
                                        <div class="text-5xl text-center text-red-700">Túl kevés napos óra! </div>  

                                    {:else if (tmpSunnyHours > 5000 )}
                                        
                                        <div class="text-5xl text-center text-red-700">Túl sok napos óra! </div>  
                                    
                                    {:else}
                                    
                                    <Dialog.Title class="text-3xl">
                                        Biztosan ennyi napsütéses órával szeretnéd frissíteni az üveget?
                                    </Dialog.Title>
                                    
                                        <div class="mt-2 mb-2 text-2xl text-destructive"> Napsütéses órák száma: {tmpSunnyHours}</div>
                                    
                                    <Dialog.Description class="text-lg">
                                        Ez a művelet visszafordíthatatlan és költségekkel jár!
                                    </Dialog.Description>

                                    <Button on:click={sunnyUpdate} class="mt-2 w-full">Frissítés</Button>
    
                                    {/if}
                                </Dialog.Header>
        
                            </Dialog.Content>
                        </Dialog.Root> 
                    </div>
         
                    
            
                <Label>Eső miliméterben</Label>
                <div class="flex">
                    <Input type="number" bind:value={tmpRainMilimeters} />
                    <Dialog.Root bind:open={rainDialogOpen}>
                        <Dialog.Trigger class="ml-1 px-3 text-slate-800 font-semibold text-base bg-white rounded-md" >Frissítés</Dialog.Trigger>
                        <Dialog.Content class="max-w-2xl w-1/2 bg-slate-900">
                            
                            <Dialog.Header class="mt-4 mb-3">
                                {#if (bottleAddress!=address)}

                                    <div class="mt-2 mb-2 text-3xl text-center">Csak saját üveget frissíthetsz!</div>
                                
                                {:else if tmpRainMilimeters==rainMilimeters[rainMilimeters.length-1]}
                                    <div class="mt-2 mb-2 text-3xl text-center">Adja meg az új eső mennyiséget!</div>

                                {:else if (tmpRainMilimeters < 100 )}
                                    <div class="text-5xl text-center text-red-700">Túl kevés eső!</div>  

                                {:else if (tmpRainMilimeters > 1500 )}
                                    <div class="text-5xl text-center text-red-700">Túl sok eső!</div>  
                                
                                {:else}
                                <div class="mt-2 mb-2 text-3xl text-center">Adja meg az eső mennyiségét!</div>
                                
                                <Dialog.Title class="text-3xl">Biztosan ezzel az eső mennyiséggel szeretnéd frissíteni az üveget?
                                    <div class="mt-2 mb-2 text-2xl text-destructive"> Eső mennyisége: {tmpRainMilimeters} mm</div>
                                </Dialog.Title>
                                
                                <Dialog.Description class="text-lg">
                                    Ez a művelet visszafordíthatatlan és költségekkel jár!
                                </Dialog.Description>
    
                                <Button on:click={rainUpdate} class="mt-2 w-full">Frissítés</Button>
                                {/if}
                            </Dialog.Header>
    
                        </Dialog.Content>
                    </Dialog.Root> 
                </div>
                    
                
                    
                <Label>Szüretelés időpontja</Label>
                <div class="flex">
                    <Input type="string" bind:value={tmpTimeOfHarvest} />
                    <Dialog.Root bind:open={harvestDialogOpen}>
                        <Dialog.Trigger class="ml-1 px-3 text-slate-800 font-semibold text-base bg-white rounded-md" >Frissítés</Dialog.Trigger>
                        <Dialog.Content class="max-w-2xl w-1/2 bg-slate-900">
                            <Dialog.Header class="mt-4 mb-3">
                                {#if (bottleAddress!=address)}

                                    <div class="mt-2 mb-2 text-3xl text-center">Csak saját üveget frissíthetsz!</div>
                                
                                {:else if tmpTimeOfHarvest==timeOfHarvest[timeOfHarvest.length-1]}
                                    <div class="mt-2 mb-2 text-3xl text-center">Adja meg az új szüretelési dátumot!</div>
                                
                                {:else if (  !moment(tmpTimeOfHarvest,dateFormats).isValid() 
                                        || 
                                        moment(tmpTimeOfHarvest,dateFormats).isAfter(moment())
                                )}
                                    <div class="mt-2 mb-2 text-3xl text-center">Nem megfelelő dátum!</div>
                                {:else}

                                <div class="mt-2 mb-2 text-3xl text-center">Adja meg a szüretelés időpontját!</div>
                                <Dialog.Title class="text-3xl">Biztosan ezzel a szüretelési dátummal szeretnéd frissíteni az üveget?
                                    <div class="mt-2 mb-2 text-2xl text-destructive"> Szüret dátuma: {tmpTimeOfHarvest}</div>
                                </Dialog.Title>
                                
                                <Dialog.Description class="text-lg">
                                    Ez a művelet visszafordíthatatlan és költségekkel jár!
                                </Dialog.Description>
                                <Button on:click={harvestUpdate} class="mt-2 w-full">Frissítés</Button>

                                {/if}

                            </Dialog.Header>
                            
                        </Dialog.Content>
                    </Dialog.Root> 
                </div>
            
            
                
                <Label>Palackozás időpontja</Label>
                <div class="flex">
                    <Input type="string" bind:value={tmpTimeOfBottling} />
                    
                    <Dialog.Root bind:open={bottlingDialogOpen}>
                        <Dialog.Trigger class="ml-1 px-3 text-slate-800 font-semibold text-base bg-white rounded-md " >Frissítés</Dialog.Trigger>
                        <Dialog.Content class="max-w-2xl w-1/2 bg-slate-900">
                            <Dialog.Header class="mt-4 mb-3">
                                {#if (bottleAddress!=address)}
                                    <div class="mt-2 mb-2 text-3xl text-center">Csak saját üveget frissíthetsz!</div>
                                
                                {:else if  tmpTimeOfBottling==timeOfBottling[timeOfBottling.length-1]}
                                    <div class="mt-2 mb-2 text-3xl text-center">Adja meg az új palackozási dátumot!</div>
                               
                                
                                {:else if (  
                                    !moment(tmpTimeOfBottling,dateFormats).isValid() 
                                    || 
                                    moment(tmpTimeOfBottling,dateFormats).isAfter(moment())
                                    ||
                                    moment(tmpTimeOfBottling,dateFormats).isBefore(moment(tmpTimeOfBottling,dateFormats)) 
                                )}

                                    <div class="mt-2 mb-2 text-3xl text-center">Nem megfelelő dátum!</div>
                                



                                {:else}
                                    <Dialog.Title class="text-3xl">Biztosan ezzel a palackozási dátummal szeretnéd frissíteni az üveget?
                                        <div class="mt-2 mb-2 text-2xl text-destructive"> Palackozás dátuma: {tmpTimeOfBottling}</div>
                                    </Dialog.Title>
                                    
                                    <Dialog.Description class="text-lg">
                                        Ez a művelet visszafordíthatatlan és költségekkel jár!
                                    </Dialog.Description>
                                    <Button on:click={bottlingUpdate} class="mt-2 w-full">Frissítés</Button>
                                {/if}
                            </Dialog.Header>
                        </Dialog.Content>
                    </Dialog.Root> 
                </div>



                <Button on:click={() => $gotID = false} class="w-full mt-5 font-medium text-lg" >Másik üveg frissítése</Button>
                {/if}
            </Card.Content>

            <Card.Footer class="block">
                <div class="text-xl text-center text-slate-400">
                   Nem frissíteni szeretnél üveget?
                </div>

                <div class="flex justify-evenly">
                    <Button class="text-xl mt-1 " variant="link" href="/register">Regisztráció</Button
                    >
                    <Button class="text-xl mt-1" variant="link" href="/check"
                        >Ellenőrzés</Button
                    >
                    <Button class="text-xl mt-1" variant="link" href="/transfer"
                        >Tulajdonjog</Button>
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
