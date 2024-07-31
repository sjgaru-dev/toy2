import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface BadgeProps {
  label: string;
  color: string;
}

const Badge = ({ label, color }: BadgeProps) => <span css={badgeStyle(color)}>{label}</span>;

const badgeStyle = (color: string) => css`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${theme.fontSizes.small};
  font-weight: bold;
  color: ${color};
  background-color: ${color + '1a'};
`;

export default Badge;
