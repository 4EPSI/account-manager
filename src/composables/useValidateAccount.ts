import { ref, reactive } from 'vue';
import type { Account } from '../types/account';

export function useValidateAccount(account: Account) {
  const errors = reactive({
    label: '',
    login: '',
    password: ''
  });

  const wasEverValid = ref(false);

  const validate = () => {
    errors.label = account.label.length > 50 ? 'Максимум 50 символов' : '';

    errors.login = !account.login
      ? 'Логин обязателен'
      : account.login.length < 8
        ? 'Минимум 8 символов'
        : account.login.length > 100
          ? 'Максимум 100 символов'
          : '';

    errors.password =
      account.type === 'Локальная'
        ? !account.password
          ? 'Пароль обязателен'
          : account.password.length < 8
            ? 'Минимум 8 символов'
            : account.password.length > 100
              ? 'Максимум 100 символов'
              : ''
        : '';

    return !errors.label && !errors.login && !errors.password;
  };

  return {
    errors,
    wasEverValid,
    validate
  };
}