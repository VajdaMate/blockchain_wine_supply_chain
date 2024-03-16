import type { PageServerLoad, Actions } from './$types';
import { superValidate } from "sveltekit-superforms";
import { registerSchema } from '$lib/schema';
import { zod } from "sveltekit-superforms/adapters";
import { fail } from '@sveltejs/kit';
import {ethers} from 'ethers';
import { defaultEvmStores as evm, signer } from "ethers-svelte"
import {factoryContractAdress, factoryAbi, bottleAbi} from '$lib/constants'


export const load: PageServerLoad = async () => {
  return {
      form: await superValidate(zod(registerSchema))
  }
}


export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(registerSchema));
    console.log(form);

    if (!form.valid) {
      return fail(400, { form });
    }
    
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    
    const factoryContract=new ethers.Contract(factoryContractAdress,factoryAbi,)  


    
    console.log(form);
    return { form };
  }
};
