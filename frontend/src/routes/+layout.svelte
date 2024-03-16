<script lang="ts">
    import '$lib/app.css'
    import {factoryContractAdress, factoryAbi, bottleAbi} from '$lib/constants'
    import { defaultEvmStores as evm , contracts} from 'ethers-svelte'
    import { onMount } from 'svelte';
    
    onMount(async () => {
        evm.attachContract("Contract1", factoryContractAdress, JSON.stringify(factoryAbi))
    })
    
</script>

<slot />