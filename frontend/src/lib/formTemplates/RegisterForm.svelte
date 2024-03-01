<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input} from "$lib/components/ui/input";
    import { registerSchema, type RegisterSchema } from "$lib/schema";
    import  { superForm, 
                type Infer, 
                type SuperValidated 
            } from 'sveltekit-superforms'
    
            
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: SuperValidated<Infer<RegisterSchema>>;

     const form = superForm(data, {
        validators: zodClient(registerSchema)
    });
    const { form: formData, enhance } = form
</script>


<form method="POST" use:enhance>
                
    <Form.Field {form} name="typeOfGrape">
        <Form.Control let:attrs>
            <Form.Label>Szőlő fajtája</Form.Label> 
            <Input {...attrs} bind:value={$formData.typeOfGrape} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="sunnyHours">
        <Form.Control let:attrs>
            <Form.Label>Napsütéses órák száma</Form.Label> 
            <Input {...attrs} bind:value={$formData.sunnyHours} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="timeOfHarvest">
        <Form.Control let:attrs>
            <Form.Label>Szüretelés időpontja</Form.Label> 
            <Input {...attrs} bind:value={$formData.timeOfHarvest} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="timeOfBottling">
        <Form.Control let:attrs>
            <Form.Label>Palackozás időpontja</Form.Label> 
            <Input {...attrs} bind:value={$formData.timeOfBottling} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Button class="mt-3">Regisztrálás</Form.Button>
</form>