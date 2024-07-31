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
  margin-bottom: 1rem;
  width: 100%;
`;

const labelStyle = css`
  display: flex;
  margin-bottom: 0.5rem;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.black};
`;

const inputStyle = css`
  width: 100%;
  padding: 0.5rem 1rem;
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
  margin-top: 0.5rem;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.alertRed};
`;

const readOnlyStyle = css`
  background-color: ${theme.colors.bgGray};
  color: ${theme.colors.darkGray};
  cursor: not-allowed;
`;

export default Input;
