<script setup lang="ts">
import { toRefs, watch } from 'vue';
import type { Account } from '../types/account';

const props = defineProps<{
  account: Account;
}>();

const emit = defineEmits<{
  (e: 'update', updated: Account): void;
  (e: 'delete', id: string): void;
}>();

const { label, type, login, password, isValid } = toRefs(props.account);

watch([label, type, login, password], () => {
  emit('update', {
    id: props.account.id,
    label: label.value,
    type: type.value,
    login: login.value,
    password: type.value === 'Локальная' ? password.value : null,
    labelTags: props.account.labelTags,
    isValid: isValid.value,
  });
});
</script>

<template>
  <el-card :class="{ invalid: !isValid }">
    <div class="fields">
      <el-input
        v-model="label"
        placeholder="Метка (через ;)"
        maxlength="50"
        clearable
      />

      <el-select
        v-model="type"
        placeholder="Тип"
        style="width: 150px"
      >
        <el-option label="LDAP" value="LDAP" />
        <el-option label="Локальная" value="Локальная" />
      </el-select>

      <el-input
        v-model="login"
        placeholder="Логин"
        maxlength="100"
        clearable
      />

      <el-input
        v-if="type === 'Локальная'"
        v-model="password"
        type="password"
        placeholder="Пароль"
        maxlength="100"
        clearable
      />

      <el-button type="danger" @click="emit('delete', props.account.id)">Удалить</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.fields {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}
.invalid {
  border: 1px solid red;
}
</style>