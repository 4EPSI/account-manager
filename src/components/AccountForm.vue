<script setup lang="ts">
import { useAccountStore } from '../stores/useAccountStore';
import { parseLabel } from '../utils/parseLabel';
import { validateAccount } from '../utils/validators';
import { computed } from 'vue';
import AccountItem from './AccountItem.vue';

const store = useAccountStore();
const accounts = computed(() => store.accounts);

const onUpdate = (account) => {
  const labelTags = parseLabel(account.label);
  const isValid = validateAccount(account);

  store.updateAccount(account.id, {
    ...account,
    labelTags,
    isValid,
  });
};
</script>

<template>
  <div>
    <div class="header">
      <h2>Учётные записи</h2>
      <el-button type="primary" @click="store.addAccount">Добавить +</el-button>
    </div>

    <div class="account-list">
      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @update="onUpdate"
        @delete="store.removeAccount"
      />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>