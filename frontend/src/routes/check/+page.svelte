<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Alert from "$lib/components/ui/alert";
    import type { PageData } from './$types'
    import { onMount } from "svelte"
    import { defaultEvmStores,
            connected,
           } from "ethers-svelte"
    
    import CheckForm from "$lib/formTemplates/CheckForm.svelte";      
    import RowCentered from '$lib/RowCentered.svelte'; 
    import ColCentered from "$lib/ColCentered.svelte";
    import BottleImage from '$lib/assets/Wine BottleSmall.png'
    
    export let data: PageData

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
            <Alert.Title class="text-5xl text-slate-400">Please connect your wallet!</Alert.Title>
            <Alert.Description class="text-2xl text-slate-400">
            Without connecting your wallet, you can't interact with the blockchain.
            </Alert.Description>
    </Alert.Root>
    <Button class="text-4xl text-slate-600 m-10 p-10" on:click={connectWallet}>Connect</Button>
</ColCentered>

{:else}


<RowCentered>
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

        <Card.Content>
            <CheckForm data={data.form} />
            
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