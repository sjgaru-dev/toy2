export type InputProps = {
  label: string;
  placeholder?: string;
  errMsg?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type buttonProps = {
  label: string;
  color?: string;
};

export type validProps = {
  value: string;
  regex: RegExp;
};
