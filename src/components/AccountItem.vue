<script setup lang="ts">
import { toRefs, watch, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type { Account } from '../types/account';
import { useValidateAccount } from '../composables/useValidateAccount';

const props = defineProps<{
  account: Account;
  focusLabel?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update', updated: Account): void;
  (e: 'delete', id: string): void;
}>();

const { label, type, login, password, isValid } = toRefs(props.account);
const inputRef = ref<HTMLInputElement | null>(null);

const { errors, validate, wasEverValid } = useValidateAccount(props.account);

watch([label, type, login, password], () => {
  const valid = validate();

  if (valid && !wasEverValid.value) {
    ElMessage({
      message: 'Учетная запись сохранена',
      type: 'success',
      duration: 1500,
    });
    wasEverValid.value = true;
  }

  emit('update', {
    id: props.account.id,
    label: label.value,
    type: type.value,
    login: login.value,
    password: type.value === 'Локальная' ? password.value : null,
    labelTags: props.account.labelTags,
    isValid: valid,
  });
});

onMounted(() => {
  if (props.focusLabel && inputRef.value) {
    inputRef.value.focus();
  }
  validate();
});
</script>

<template>
  <el-card :class="{ invalid: !isValid }">
    <div class="fields">
      <div class="field">
        <label :for="`label-${props.account.id}`">Метка</label>
        <el-input
          :id="`label-${props.account.id}`"
          ref="inputRef"
          v-model="label"
          placeholder="Метка (через ;)"
          maxlength="50"
          clearable
          @blur="validate"
        />
  <div class="error" v-if="errors.label">{{ errors.label }}</div>
</div>

      <div class="field">
        <label :for="`type-${props.account.id}`">Тип записи</label>
        <el-select
          :id="`type-${props.account.id}`"
          v-model="type"
          placeholder="Тип"
          style="width: 150px"
        >
          <el-option label="LDAP" value="LDAP" />
          <el-option label="Локальная" value="Локальная" />
        </el-select>
      </div>

      <div class="field">
        <label :for="`login-${props.account.id}`">Логин</label>
        <el-input
          :id="`login-${props.account.id}`"
          v-model="login"
          placeholder="Логин"
          maxlength="100"
          clearable
          @blur="validate"
        />
        <div class="error" v-if="errors.login">{{ errors.login }}</div>
      </div>

      <div class="field" v-if="type === 'Локальная'">
        <label :for="`password-${props.account.id}`">Пароль</label>
        <el-input
          :id="`password-${props.account.id}`"
          v-model="password"
          type="password"
          placeholder="Пароль"
          maxlength="100"
          clearable
          @blur="validate"
        />
        <div class="error" v-if="errors.password">{{ errors.password }}</div>
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

.error {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 4px;
}

.delete {
  padding-top: 22px;
}

.invalid {
  border: 1px solid red;
}

:deep(.el-input__inner) {
  padding-right: 36px !important;
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
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.16s ease;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}

:deep(.el-input:hover .el-input__clear),
:deep(.el-input.is-focus .el-input__clear) {
  opacity: 1;
  pointer-events: auto;
}
</style>