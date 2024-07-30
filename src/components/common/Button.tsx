import { css, SerializedStyles } from '@emotion/react';

import theme from '../../styles/theme';

interface ButtonProps {
  label: string;
  onClick?: () => void; // 리턴값이 없는 함수
  styleType?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'text' | 'disabled';
  customStyle?: SerializedStyles;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  styleType = 'primary',
  customStyle,
}: ButtonProps) => (
  <button css={[baseButtonStyles, buttonStyles[styleType], customStyle]} onClick={onClick}>
    {label}
  </button>
);

const baseButtonStyles = css`
  width: 100%;
  height: ${theme.heights.tall};
  font-weight: 700;
  border-radius: 4px;
  transition: all 300ms ease;
`;

const buttonStyles = {
  primary: css`
    background-color: ${theme.colors.primary};
    border: 0;
    color: ${theme.colors.white};

    &:hover {
      background-color: ${theme.colors.hoverPrimary};
    }
  `,
  secondary: css`
    background-color: ${theme.colors.lightGray};
    border: 0;
    color: ${theme.colors.black};
    &:hover {
      background-color: ${theme.colors.hoverLightGray};
    }
  `,
  tertiary: css`
    background-color: ${theme.colors.lightestGray};
    border: 0;
    color: ${theme.colors.darkestGray};
    &:hover {
      background-color: ${theme.colors.lightGray};
      color: ${theme.colors.black};
    }
  `,
  ghost: css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.lightGray};
    color: ${theme.colors.darkestGray};
    &:hover {
      border: 1px solid ${theme.colors.hoverPrimary};
      color: ${theme.colors.hoverPrimary};
    }
  `,
  text: css`
    background-color: ${theme.colors.white};
    border: 0;
    color: ${theme.colors.darkGray};
    &:hover {
      background-color: ${theme.colors.lightestGray};
      color: ${theme.colors.black};
    }
  `,
  disabled: css`
    background-color: ${theme.colors.lightestGray};
    border: 0;
    color: ${theme.colors.darkGray};
    cursor: not-allowed;
  `,
};

export default Button;
