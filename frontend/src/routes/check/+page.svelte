<script lang="ts">
    import type { PageData } from './$types'
    import * as Card from "$lib/components/ui/card";
    import CheckForm from "$lib/CheckForm.svelte";

    export let data: PageData

</script>

<div class="h-screen flex flex-col justify-center">
    <Card.Root class="bg-slate-900 w-full sm:w-2/4 md:w-1/2 lg:w-1/3 h-5/6 ml-20" >
        <Card.Header>
            <Card.Title class="text-4xl mb-2">Ellenőrizd egy üveg eredetiségét!</Card.Title>
            
            <Card.Description class="text-base">
            Le tudod ellenőrizni az üveged eredetiségét, az üveg azonosítójának segítségével, mely után minden rögzített adatot megtekinthetsz az üvegről.
            </Card.Description>
        
        </Card.Header>  

        <Card.Content>
            <CheckForm data={data.form} />
            


        </Card.Content>
        
        
        <Card.Footer>
        </Card.Footer>
    </Card.Root>
</div>