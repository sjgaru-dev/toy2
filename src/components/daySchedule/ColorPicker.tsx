/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import { HiCheck } from 'react-icons/hi';

import { schedulePickerColors } from '@/constants/colors';
import theme from '@/styles/theme';

export type ColorsType = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';

interface ColorPickerProps {
  selected: ColorsType;
  setSelected: (value: ColorsType) => void;
}

const ColorPicker = ({ selected, setSelected }: ColorPickerProps) => {
  const onSelectColor = (color: ColorsType) => setSelected(color);

  return (
    <div css={colorContainerStyle}>
      {Object.entries(schedulePickerColors).map(([colorName, hex]) => (
        <div
          key={colorName}
          css={colorStyle(hex)}
          aria-label={colorName}
          onClick={() => onSelectColor(colorName as ColorsType)}
        >
          {selected === colorName && <HiCheck />}
        </div>
      ))}
    </div>
  );
};

const colorContainerStyle = css`
  display: flex;
  gap: 0.5rem;
`;

const colorStyle = (hex: string) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: ${theme.colors.white};
  font-size: 20px;
  background-color: ${hex};
  cursor: pointer;
`;

export default ColorPicker;
