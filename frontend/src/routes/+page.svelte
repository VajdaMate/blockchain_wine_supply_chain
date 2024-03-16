<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import RowCentered from '$lib/RowCentered.svelte';
    import BottleImage from '$lib/assets/Wine Bottle.png'
</script>

<RowCentered>
    <div>
        <Button class="text-xl lg:text-5xl text-slate-400" variant="link" href="/register"> 
            Regisztrálj egy üveget
        </Button>
    </div>
    
    <RowCentered>
       <img class="h-full w-full object-cover" src={BottleImage} alt="Wine Bottle" />
    </RowCentered>
    
    <div>
        <Button class="text-xl lg:text-5xl text-slate-400" variant="link" href="/check"> 
            Ellenőrizz egy üveget
        </Button>
    </div>
</RowCentered>