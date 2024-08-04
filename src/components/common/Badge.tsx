import { css } from '@emotion/react';

import theme from '@/styles/theme';

type HexColorString = string;
interface BadgeProps {
  label: string;
  color: HexColorString;
}

const Badge = ({ label, color }: BadgeProps) => <span css={badgeStyle(color)}>{label}</span>;

const badgeStyle = (color: HexColorString) => css`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${theme.fontSizes.small};
  font-weight: bold;
  color: ${color};
  background-color: ${color + '1a'};
`;

export default Badge;
