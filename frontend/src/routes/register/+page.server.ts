import type { PageServerLoad, Actions } from './$types';
import { superValidate } from "sveltekit-superforms";
import { registerSchema } from '$lib/schema';
import { zod } from "sveltekit-superforms/adapters";
import { fail } from '@sveltejs/kit';
import { ethers} from 'ethers';
import { defaultEvmStores as evm } from "ethers-svelte"
import {factoryContractAdress, factoryAbi, bottleAbi} from '$lib/constants'
import { string } from 'zod';


export const load: PageServerLoad = async () => {
  return {
      form: await superValidate(zod(registerSchema))
  }
}

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(registerSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
    return { form };
  }
};
