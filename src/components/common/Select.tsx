/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import { Combobox, ComboboxButton, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi2';

import theme from '@/styles/theme';

interface SelectProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const Select = ({ options, selected, onChange }: SelectProps) => (
  <div css={wrapperStyle}>
    <Combobox value={selected} onChange={onChange}>
      <ComboboxButton css={buttonStyle}>
        <span css={selectedStyle}>{selected}</span> <HiChevronDown />
      </ComboboxButton>

      <ComboboxOptions transition css={optionsStyle}>
        {options.map((option, index) => (
          <ComboboxOption key={index} value={option} css={optionStyle}>
            {option}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  </div>
);

const wrapperStyle = css`
  position: relative;
  width: 110px;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  font-weight: 500;
  background-color: ${theme.colors.white};

  svg {
    color: ${theme.colors.darkestGray};
  }
`;

const selectedStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkestGray};
`;

const optionsStyle = css`
  position: absolute;
  width: 110px;
  padding: 4px 8px;
  margin-top: 4px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  font-weight: 500;
  background-color: ${theme.colors.white};
`;

const optionStyle = css`
  padding: 8px 4px;
  margin: 4px 0;
  border-radius: 4px;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkestGray};
  cursor: pointer;

  &[data-selected] {
    background-color: ${theme.colors.bgGray};
  }
`;

export default Select;
