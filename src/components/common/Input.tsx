/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import { Description, Field, Input as InputFromUI, Label } from '@headlessui/react';

import theme from '@/styles/theme';

interface InputProps {
  label?: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  isError?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
}

const Input = ({
  label,
  value,
  placeholder,
  onChange,
  isError = false,
  errorMessage = '',
  readOnly = false,
}: InputProps) => (
  <div css={wrapperStyle}>
    <Field>
      {label && <Label css={labelStyle}>{label}</Label>}
      <InputFromUI
        value={value}
        onChange={(e) => onChange(e.target.value)}
        css={[inputStyle, readOnly && readOnlyStyle]}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {isError && <Description css={errorStyle}>{errorMessage}</Description>}
      {readOnly && <div css={readOnlyStyle} />}
    </Field>
  </div>
);

const wrapperStyle = css`
  display: inline-block;
  margin-bottom: 16px;
  width: 100%;
`;

const labelStyle = css`
  margin-bottom: 16px;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.black};
`;

const inputStyle = css`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkestGray};
  background-color: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const errorStyle = css`
  margin-top: 8px;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.alertRed};
`;

const readOnlyStyle = css`
  background-color: ${theme.colors.bgGray};
  color: ${theme.colors.darkGray};
  cursor: not-allowed;
`;

export default Input;
