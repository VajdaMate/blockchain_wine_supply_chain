<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Alert from "$lib/components/ui/alert";
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";
    import * as Dialog from "$lib/components/ui/dialog";


    import { onMount } from "svelte";

    import { defaultEvmStores as evm, connected } from "ethers-svelte";
    import { ethers } from "ethers";

    import {
        contractAdress,
        BottleStoreABI
    } from "$lib/constants";

    import RowCentered from "$lib/RowCentered.svelte";
    import ColCentered from "$lib/ColCentered.svelte";
    import BottleImage from "$lib/assets/Wine BottleSmall.png";

    let contractRegistered:boolean = false;

    let typeOfGrape: string="";
    let bottleID: number;

    let provider: ethers.BrowserProvider
    let signer: ethers.JsonRpcSigner
    let BottleStore: ethers.Contract

    let dialogOpen = false;

    async function submitForm() {
        contractRegistered = false;
       
        const tx = await BottleStore.registerBottle(typeOfGrape);
        const receipt = await (tx as any).wait();
        if (receipt.status === 1) {
            bottleID = await BottleStore.returnLastBottleID();
            contractRegistered = true;
            console.log("Transaction successful!");
        } else {
            console.error("Transaction failed:", receipt);
        }
        dialogOpen = false;
        typeOfGrape = "";
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
                    >Regisztráljon egy üveget!</Card.Title
                >
                <Card.Description class="text-base">
                    Szőlő fajtájának megadásávál rögzítheti az üveget a
                    blokkláncon.
                </Card.Description>
            </Card.Header>

            <Card.Content>
                                
            
                <Label>Szőlő fajtája</Label>
                <Input type="string" bind:value={typeOfGrape} />
                
                <Dialog.Root bind:open={dialogOpen}>
                    <Dialog.Trigger class="mt-2 p-1 w-full text-slate-800 font-medium text-lg bg-white rounded-sm" >Frissítés</Dialog.Trigger>
                    <Dialog.Content class="max-w-2xl w-1/2 bg-slate-900">
                        
                        {#if typeOfGrape == ""}
                            <div class="mt-2 mb-2 text-3xl text-center">Nem adott meg szőlőfajtát!</div>
                        {:else}

                        <Dialog.Header class="mt-4 mb-3">
                            
                            <Dialog.Title class="text-3xl">Biztosan ezzel a szőlőfajtával szeretnéd regisztrálni az üveget?
                                <div class="mt-2 mb-2 text-2xl text-red-700"> Szőlőfajta: {typeOfGrape}</div>
                            </Dialog.Title>
                            
                            <Dialog.Description class="text-lg">
                                Ez a művelet visszafordíthatatlan, és költségekkel jár!
                            </Dialog.Description>

                            <Button on:click={submitForm} class="mt-2 w-full">Regisztráció</Button>

                        </Dialog.Header>
                        
                        {/if}

                    </Dialog.Content>
                </Dialog.Root>
                    
                

                {#if contractRegistered}
                    <div class="flex justify-center items-center">
                        <Alert.Root class="w-full h-1/2 mt-5">
                            <Alert.Title class="text-2xl text-slate-400"
                                >Sikeres regisztráció!</Alert.Title
                            >
                            <Alert.Description class="text-1xl text-slate-400">
                                Az üveg sikeresen rögzítésre került a
                                blokkláncon!
                                <div>Az alábbi azonosítóval: {bottleID}</div>
                                <div>Az alábbi címen lévő okosszerződés elemeként: {contractAdress}</div>
                            </Alert.Description>
                        </Alert.Root>
                    </div>
                {/if}

            </Card.Content>

            <Card.Footer class="block">
                <div class="text-xl text-center text-slate-400">
                    Már regisztráltad az üveget? Ellenőrizd, vagy frissítsd:
                </div>

                <div class="flex justify-evenly">
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
