import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface BadgeProps {
  label: string;
  color: 'red' | 'orange' | 'green' | 'gray';
}

const Badge = ({ label, color }: BadgeProps) => (
  <span className={`color-${color}`} css={badgeStyle}>
    {label}
  </span>
);

const badgeStyle = css`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${theme.fontSizes.small};
  font-weight: bold;

  &.color-red {
    color: ${theme.colors.alertRed};
    background-color: ${theme.colors.alertRed + '1a'};
  }
  &.color-orange {
    color: ${theme.colors.supportOrange};
    background-color: ${theme.colors.supportOrange + '1a'};
  }
  &.color-green {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.primary + '1a'};
  }
  &.color-gray {
    color: ${theme.colors.darkGray};
    background-color: ${theme.colors.darkGray + '1a'};
  }
`;

export default Badge;
