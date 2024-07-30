/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';

import theme, { ColorsTypes } from '@/styles/theme';

type BadgeColorsType = 'red' | 'orange' | 'green' | 'gray';

interface BadgeProps {
  label: string;
  color: BadgeColorsType;
}

const badgeColors: { [key in BadgeColorsType]: keyof ColorsTypes } = {
  red: 'alertRed',
  orange: 'supportOrange',
  green: 'primary',
  gray: 'darkGray',
};

const Badge = ({ label, color }: BadgeProps) => <span css={badgeStyle(color)}>{label}</span>;

const badgeStyle = (color: BadgeColorsType) => css`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${theme.fontSizes.small};
  font-weight: bold;
  color: ${theme.colors[badgeColors[color]]};
  background-color: ${theme.colors[badgeColors[color]] + '1a'};
`;

export default Badge;
