<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Alert from "$lib/components/ui/alert";
    import * as Table from "$lib/components/ui/table";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";

    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { defaultEvmStores as evm, connected } from "ethers-svelte";

    import { ethers } from "ethers";

    import {
        contractAdress,
        BottleStoreABI,
        headerArray,
    } from "$lib/constants";

    class Bottle {
        bottleId: number;
        typeOfGrape: string;
        sunnyHours: number;
        rainMilimeters: number;
        timeOfHarvest: string;
        timeOfBottling: string;
        constructor(
            bottleId: number,
            typeOfGrape: string,
            sunnyHours: number,
            rainMilimeters: number,
            timeOfHarvest: string,
            timeOfBottling: string,
        ) {
            this.bottleId = bottleId;
            this.typeOfGrape = typeOfGrape;
            this.sunnyHours = sunnyHours;
            this.rainMilimeters = rainMilimeters;
            this.timeOfHarvest = timeOfHarvest;
            this.timeOfBottling = timeOfBottling;
        }
    }


    import RowCentered from "$lib/RowCentered.svelte";
    import ColCentered from "$lib/ColCentered.svelte";
    import BottleImage from "$lib/assets/Wine BottleSmall.png";


    let bottle:Bottle;
    let ID: number;
    let infoArray: any;
    let gotID = writable(false);

    let provider: ethers.BrowserProvider
    let signer: ethers.JsonRpcSigner
    let BottleStore: ethers.Contract

    async function getID() {
        let temp= await BottleStore.returnBottleByID(ID)
        bottle = new Bottle(
            temp.bottleId,
            temp.typeOfGrape,
            temp.sunnyHours,
            temp.rainMilimeters,
            temp.timeOfHarvest,
            temp.timeOfBottling,
        );
        
        $gotID = true;
        infoArray = writable([
            bottle.bottleId,
            bottle.typeOfGrape,
            bottle.sunnyHours,
            bottle.rainMilimeters,
            bottle.timeOfHarvest,
            bottle.timeOfBottling,
        ]);
    }

    async function sunnyUpdate() {
        const tx = await BottleStore.updateSunnyHours(ID,bottle.sunnyHours);
        const success = await (tx as any).wait();
        if (success.status === 1) {
            $infoArray[2] = bottle.sunnyHours;
            console.log("Successfully updated!");
        } else {
            console.error("Transaction failed:", success);
        }
    }

    async function rainUpdate() {
        const tx = await BottleStore.updateRainMilimeters(ID,bottle.rainMilimeters);
        const success = await (tx as any).wait();
        if (success.status === 1) {
            $infoArray[3] = bottle.rainMilimeters;
            console.log("Successfully updated!");
        } else {
            console.error("Transaction failed:", success);
        }
        
    }

    async function harvestUpdate() {
        const tx = await BottleStore.updateTimeOfHarvest(ID,bottle.timeOfHarvest);

        const success = await (tx as any).wait();
        if (success.status === 1) {
            $infoArray[4] = bottle.timeOfHarvest;
            console.log("Successfully updated!");
        } else {
            console.error("Transaction failed:", success);
        }
    }
    async function bottlingUpdate() {
        const tx = await BottleStore.updateTimeOfBottling(ID,bottle.timeOfBottling);

        const success = await (tx as any).wait();
        if (success.status === 1) {
            $infoArray[5] = bottle.timeOfBottling;
            console.log("Successfully updated!");
        } else {
            console.error("Transaction failed:", success);
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
            class="bg-slate-900 w-full sm:w-2/4 md:w-1/2 lg:w-1/3 h-5/6 ml-20 mr-20"
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
                    <form>
                        <Label>Üveg azonosítója</Label>
                        <Input type="number" bind:value={ID} />
                        <Button on:click={getID} class="mt-2 w-full"
                            >Üveg lekérése</Button
                        >
                    </form>
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
                            <Table.Row>
                                {#each $infoArray as info}
                                    <Table.Cell>{info}</Table.Cell>
                                {/each}
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>

                    <form>
                        <Label>Napsütéses órák száma</Label>
                        <div class="flex">
                            <Input type="number" bind:value={bottle.sunnyHours} />
                            <Button on:click={sunnyUpdate} class="ml-2"
                                >Frissítés</Button
                            >
                        </div>
                    </form>

                    <form>
                        <Label>Eső miliméterben</Label>
                        <div class="flex">
                            <Input type="number" bind:value={bottle.rainMilimeters} />
                            <Button on:click={rainUpdate} class="ml-2"
                                >Frissítés</Button
                            >
                        </div>
                    </form>

                    <form>
                        <Label>Szüretelés időpontja órák száma</Label>
                        <div class="flex">
                            <Input type="string" bind:value={bottle.timeOfHarvest} />
                            <Button on:click={harvestUpdate} class="ml-2"
                                >Frissítés</Button
                            >
                        </div>
                    </form>

                    <form>
                        <Label>Palackozás időpontja</Label>
                        <div class="flex">
                            <Input type="string" bind:value={bottle.timeOfBottling} />
                            <Button on:click={bottlingUpdate} class="ml-2"
                                >Frissítés</Button
                            >
                        </div>
                    </form>
                {/if}
            </Card.Content>

            <Card.Footer class="block">
                <div class="text-xl text-center text-slate-400">
                    Új üveget szeretnék registrálni, vagy ellenőrizni?
                    Ellenőrizd, vagy frissítsd:
                </div>

                <div class="flex justify-evenly">
                    <Button
                        class="text-xl mt-1 "
                        variant="link"
                        href="/register">Regisztráció</Button
                    >
                    <Button class="text-xl mt-1" variant="link" href="/check"
                        >Ellenőrzés</Button
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
