<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import RowCentered from '$lib/RowCentered.svelte';
    import BottleImage from '$lib/assets/Wine Bottle.png'
    import ColCentered from '$lib/ColCentered.svelte';
</script>

<RowCentered>
    <ColCentered>
        <Button class="text-xl lg:text-5xl text-slate-400 mb-20" variant="link" href="/register"> 
            Regisztrálj egy üveget
        </Button>
        
        <Button class="text-xl lg:text-5xl text-slate-400" variant="link" href="/transfer">
            Ruházd át tulajdonjogod
        </Button>

    </ColCentered>
    
    <RowCentered>
       <img class="h-full w-full object-cover" src={BottleImage} alt="Wine Bottle" />
    </RowCentered>
    
    <ColCentered>
        <Button class="text-xl lg:text-5xl text-slate-400 mb-20" variant="link" href="/check"> 
            Ellenőrizz egy üveget
        </Button>

        <Button class="text-xl lg:text-5xl text-slate-400" variant="link" href="/update">
           Frissíts egy üveget
        </Button>

    </ColCentered>
</RowCentered>