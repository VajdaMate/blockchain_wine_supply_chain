
import type { PageServerLoad, Actions } from './$types';
import { superValidate } from "sveltekit-superforms";
import { updateSchema } from '$lib/schema';
import { zod } from "sveltekit-superforms/adapters";
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
      form: await superValidate(zod(updateSchema))
  }
}


export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(updateSchema));
    console.log(form);

    if (!form.valid) {
      return fail(400, { form });
    }
    console.log(form);
    return { form };
  }
};
