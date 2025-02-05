import { writable, derived } from 'svelte/store';

export const activePage = writable('home');
export const userStore = writable(null);
export const templateDataStore = writable({
    documentTitle: '',
    documentType: '',
    documentSize: '',
    tone: '',
    detailsPrompt: '',
    additionalDetails: ''
  });