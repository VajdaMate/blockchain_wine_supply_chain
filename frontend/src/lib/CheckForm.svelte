<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input} from "$lib/components/ui/input";
    import { checkSchema, type CheckSchema } from "$lib/schema";
    import  { superForm, 
                type Infer, 
                type SuperValidated 
            } from 'sveltekit-superforms'
    
            
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: SuperValidated<Infer<CheckSchema>>;

     const form = superForm(data, {
        validators: zodClient(checkSchema)
    });
    const { form: formData, enhance } = form
</script>


<form method="POST" use:enhance>
                
    <Form.Field {form} name="bottleID">
        <Form.Control let:attrs>
            <!-- <Form.Label>Üveg azonosító</Form.Label> -->
            <Input placeholder="Üveg azonosító" {...attrs} bind:value={$formData.bottleID} />
        </Form.Control>
    <Form.FieldErrors />
    </Form.Field>

    <Form.Button class="mt-3">Ellenőrzés</Form.Button>
</form>