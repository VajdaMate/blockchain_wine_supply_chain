<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Alert from "$lib/components/ui/alert";
    import * as Table from "$lib/components/ui/table";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Input } from "$lib/components/ui/input";

    import { onMount } from "svelte";

    import { defaultEvmStores as evm, connected } from "ethers-svelte";
    import { ethers } from "ethers";

    import RowCentered from "$lib/RowCentered.svelte";
    import ColCentered from "$lib/ColCentered.svelte";
    import BottleImage from "$lib/assets/Wine BottleSmall.png";
    import {
        contractAdress,
        BottleStoreABI,
        headerArray,
    } from "$lib/constants";

    import { writable, type Writable } from "svelte/store";

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

    let ID: number;
    const bottles: Writable<Bottle[]> = writable([]);

    let provider: ethers.BrowserProvider
    let signer: ethers.JsonRpcSigner
    let BottleStore: ethers.Contract

    async function listByID() {
        let temp = await BottleStore.returnBottleByID(ID);
        let bottle = new Bottle(
            temp.bottleId,
            temp.typeOfGrape,
            temp.sunnyHours,
            temp.rainMilimeters,
            temp.timeOfHarvest,
            temp.timeOfBottling,
        );

        bottles.update((currentBottles) => {
            if (currentBottles.some((b) => b.bottleId === bottle.bottleId)) {
                return currentBottles;
            } else {
                return [...currentBottles, bottle];
            }
        });
    }

    async function listByOwner(){
        let temp=await BottleStore.ownersBottles();
        console.log(temp.length)
        let bottleArray: Bottle[] = [];
        temp.forEach((bottle:Bottle) => {
            console.log(bottle)
            let tempBottle = new Bottle(
                bottle.bottleId,
                bottle.typeOfGrape,
                bottle.sunnyHours,
                bottle.rainMilimeters,
                bottle.timeOfHarvest,
                bottle.timeOfBottling,
            );
            bottleArray.push(tempBottle);
        });
        bottles.set(bottleArray);

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
                <Card.Title class="text-4xl mb-2"
                    >Ellenőrizd egy üveg eredetiségét!</Card.Title
                >

                <Card.Description class="text-base">
                    Le tudod ellenőrizni az üveged eredetiségét, az üveg
                    azonosítójának segítségével, mely után minden rögzített
                    adatot megtekinthetsz az üvegről.
                </Card.Description>
            </Card.Header>

            <Card.Content class="h-4/6">
                <form>
                    <Label>Üveg lekérés azonosító alapján</Label>
                    <Input type="number" bind:value={ID} />
                    <Button on:click={listByID} class="mt-2 w-full">Üveg lekérése megadott azonosítóval</Button>
                    <Button on:click={listByOwner} class="mt-2 w-full">Saját címmel regisztrált üvegek lekérése</Button>
                </form>
                


                <div class="max-h-96 overflow-y-scroll overflow-x-auto">
                    <Table.Root class="w-fit">
                        <Table.Header>
                            <Table.Row class="w-min">
                                {#each headerArray as header}
                                    <Table.Cell class="text-center">{header}</Table.Cell>
                                {/each}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body class="w-fit" >
                            {#each $bottles as bottle}
                                <Table.Row class="text-center">
                                    <Table.Cell >{bottle.bottleId}</Table.Cell>
                                    <Table.Cell >{bottle.typeOfGrape}</Table.Cell>
                                    <Table.Cell >{bottle.sunnyHours}</Table.Cell>
                                    <Table.Cell >{bottle.rainMilimeters}</Table.Cell>
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
                    <Button
                        class="text-xl mt-1 "
                        variant="link"
                        href="/register">Regisztráció</Button
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
