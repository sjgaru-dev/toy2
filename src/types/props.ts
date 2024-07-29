export type InputProps = {
  type: 'text' | 'password';
  label: string;
  name: string;
  placeholder?: string;
  errMsg?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ButtonProps = {
  label: string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ValidProps = {
  value: string;
  regex: RegExp;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type LogoutProps = {
  email: string;
};
