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
      <div class="field">
        <label>Метка</label>
        <el-input
          v-model="label"
          placeholder="Метка (через ;)"
          maxlength="50"
          clearable
        />
      </div>

      <div class="field">
        <label>Тип записи</label>
        <el-select
          v-model="type"
          placeholder="Тип"
          style="width: 150px"
        >
          <el-option label="LDAP" value="LDAP" />
          <el-option label="Локальная" value="Локальная" />
        </el-select>
      </div>

      <div class="field">
        <label>Логин</label>
        <el-input
          v-model="login"
          placeholder="Логин"
          maxlength="100"
          clearable
        />
      </div>

      <div class="field" v-if="type === 'Локальная'">
        <label>Пароль</label>
        <el-input
          v-model="password"
          type="password"
          placeholder="Пароль"
          maxlength="100"
          clearable
        />
      </div>

      <div class="field delete">
        <el-button type="danger" @click="emit('delete', props.account.id)">Удалить</el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.fields {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-start;
}

.field {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

label {
  font-size: 0.875rem;
  margin-bottom: 4px;
  color: #555;
}

.delete {
  padding-top: 22px;
}

.invalid {
  border: 1px solid red;
}

:deep(.el-input__inner) {
  padding-right: 36px;
}
:deep(.el-input__suffix) {
  width: 24px !important;
  min-width: 24px !important;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  pointer-events: none;
}
:deep(.el-input__clear) {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.16s ease;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
:deep(.el-input:hover .el-input__clear),
:deep(.el-input.is-focus .el-input__clear) {
  opacity: 1;
  pointer-events: all;
}
</style>