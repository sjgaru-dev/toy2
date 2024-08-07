import { ComponentType, ReactNode, SVGProps } from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface iconTextButtonProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconPosition?: 'left' | 'right';
  backgroundButton?: boolean;
  type?: string;
  onClick?: () => void;
  children: ReactNode;
}

const IconTextButton: React.FC<iconTextButtonProps> = ({
  Icon,
  iconPosition = 'right',
  backgroundButton = false,
  type = 'submit',
  onClick,
  children,
}: iconTextButtonProps) => (
  <button
    css={iconButtonStyle}
    className={`${iconPosition} ${backgroundButton ? 'background-button' : undefined}`}
    onClick={onClick}
    type='button'
  >
    <span>{children}</span>
    <Icon />
  </button>
);

const iconButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: ${theme.heights.short};
  padding: 8px 8px 8px 12px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  color: ${theme.colors.darkestGray};
  font-size: ${theme.fontSizes.normal};
  font-weight: 500;
  background-color: ${theme.colors.white};
  transition: all 300ms ease;
  flex-shrink: 0;

  &.left {
    flex-direction: row-reverse;

    span {
      margin-right: 4px;
    }
  }

  &.background-button {
    border: 0;
    color: ${theme.colors.black};
    background-color: ${theme.colors.bgGray};
  }

  &:hover {
    background-color: ${theme.colors.lightestGray};
  }
  & svg {
    font-size: ${theme.fontSizes.large};
  }
`;

export default IconTextButton;
