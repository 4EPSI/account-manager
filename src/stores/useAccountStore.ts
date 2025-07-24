import { defineStore } from 'pinia';
import { ref, watch, onMounted } from 'vue';
import type { Account } from '../types/account';

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([]);

  const addAccount = () => {
    const newAccount: Account = {
      id: crypto.randomUUID(),
      label: '',
      labelTags: [],
      type: 'Локальная',
      login: '',
      password: '',
      isValid: false,
    };
    accounts.value.push(newAccount);
  };

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter(acc => acc.id !== id);
  };

  const updateAccount = (id: string, updated: Partial<Account>) => {
    const account = accounts.value.find(acc => acc.id === id);
    if (account) {
      Object.assign(account, updated);
    }
  };

  
  watch(accounts, () => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value));
  }, { deep: true });


  onMounted(() => {
    const saved = localStorage.getItem('accounts');
    if (saved) {
      accounts.value = JSON.parse(saved);
    }
  });

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
  };
});