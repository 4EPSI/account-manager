<script setup lang="ts">
import { useAccountStore } from '../stores/useAccountStore';
import { parseLabel } from '../utils/parseLabel';
import { validateAccount } from '../utils/validators';
import { computed } from 'vue';
import AccountItem from './AccountItem.vue';

const store = useAccountStore();

const accounts = computed(() => store.accounts);
const validCount = computed(() => accounts.value.filter(acc => acc.isValid).length);

const addAccount = () => {
  store.addAccount();
};

const onUpdate = (account) => {
  const labelTags = parseLabel(account.label);
  const isValid = validateAccount(account);

  store.updateAccount(account.id, {
    ...account,
    labelTags,
    isValid,
  });
};

const exportData = () => {
  const dataStr = JSON.stringify(store.accounts, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'accounts.json';
  link.click();

  URL.revokeObjectURL(url);
};
</script>

<template>
  <div>
    <div class="header">
      <h2>Учётные записи</h2>
      <el-button type="primary" @click="addAccount">Добавить +</el-button>
      <el-button @click="exportData">Экспорт</el-button>
    </div>
    <p class="summary">
      {{ validCount }} из {{ accounts.length }} записей заполнены корректно
    </p>

    <transition-group name="fade" tag="div" class="account-list">
      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @update="onUpdate"
        @delete="store.removeAccount"
      />
    </transition-group>
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

.summary {
  font-size: 14px;
  color: #888;
  margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>