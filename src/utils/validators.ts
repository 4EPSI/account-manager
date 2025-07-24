import type { Account } from '../types/account';

export const validateAccount = (account: Account): boolean => {
  const loginValid = !!account.login && account.login.length >= 8 && account.login.length <= 100;
  const passwordValid =
    account.type === 'Локальная'
      ? !!account.password && account.password.length >= 8 && account.password.length <= 100
      : true;
  const labelValid = account.label.length <= 50;

  return loginValid && passwordValid && labelValid;
};