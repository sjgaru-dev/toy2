/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import { Description, Field, Input as InputFromUI, Label } from '@headlessui/react';

import theme from '@/styles/theme';

interface InputProps {
  label?: string;
  name?: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  isError?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
  type?: string;
}

const Input = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  isError = false,
  errorMessage = '',
  readOnly = false,
  type = 'text',
}: InputProps) => (
  <div css={wrapperStyle}>
    <Field css={fieldStyle}>
      {label && <Label css={labelStyle}>{label}</Label>}
      <div css={inputWrapperStyle}>
        <InputFromUI
          value={value}
          onChange={(e) => onChange(e.target.value)}
          css={[inputStyle, readOnly && readOnlyStyle]}
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
          name={name}
        />
        {isError && <Description css={errorStyle}>{errorMessage}</Description>}
      </div>
      {readOnly && <div css={readOnlyStyle} />}
    </Field>
  </div>
);

const wrapperStyle = css`
  display: block;
  margin-bottom: 1rem;
  width: 100%;
`;

const fieldStyle = css`
  display: flex;
`;

const inputWrapperStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const labelStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 8rem;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.black};
`;

const inputStyle = css`
  flex-grow: 1;
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
  display: block;
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
