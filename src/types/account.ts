export type AccountType = 'LDAP' | 'Локальная';

export interface Account {
  id: string;
  label: string;
  labelTags: { text: string }[];
  type: AccountType;
  login: string;
  password: string | null;
  isValid: boolean;
}