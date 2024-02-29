<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';


    import Centered from '$lib/centered.svelte';
    import BottleImage from '$lib/assets/Wine Bottle.png'
</script>

<div class="h-screen flex">
    <Centered>
        <Button class="text-xl lg:text-5xl text-slate-400" variant="link"> 
            Register a Wine
        </Button>
    </Centered>
    
    <Centered>
       <img class="h-full w-full object-cover" src={BottleImage} alt="Wine Bottle" />
    </Centered>
    
    <Centered>
        <Button class="text-xl lg:text-5xl text-slate-400" variant="link"> 
            Check a Wine
        </Button>
    </Centered>
</div> 