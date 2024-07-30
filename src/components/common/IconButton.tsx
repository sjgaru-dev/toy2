import { css } from '@emotion/react';
import { HiArrowDownTray, HiArrowUpTray, HiOutlinePencil } from 'react-icons/hi2';

import theme from '@/styles/theme';

interface iconButtonProps {
  label: string;
  onClick?: () => void;
  styleType: 'save' | 'edit' | 'addFile'; // 저장, 수정, 파일추가
}

const IconTextButton: React.FC<iconButtonProps> = ({
  label,
  styleType = 'save',
}: iconButtonProps) => {
  const iconStyles = {
    save: HiArrowDownTray,
    edit: HiOutlinePencil,
    addFile: HiArrowUpTray,
  };

  const Icon = iconStyles[styleType];

  return styleType === 'addFile' ? (
    <>
      <button css={[iconButtonStyle, iconButtonStyles[styleType]]}>
        <Icon />
        <span>{label}</span>
      </button>
    </>
  ) : (
    <>
      <button css={[iconButtonStyle, iconButtonStyles[styleType]]}>
        <span>{label}</span>
        <Icon />
      </button>
    </>
  );
};

const iconButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${theme.heights.short};
  color: ${theme.colors.darkestGray};
  border: 1px solid ${theme.colors.lightGray};
  background-color: ${theme.colors.white};
  border-radius: 4px;
  font-size: ${theme.fontSizes.normal};
  transition: all 300ms ease;
  padding: 8px 8px 8px 12px;

  &:hover {
    background-color: ${theme.colors.lightGray};
  }
  & > span {
    margin-right: 8px;
  }
  & svg {
    font-size: ${theme.fontSizes.large};
  }
`;

const iconButtonStyles = {
  /* pdf 저장 */
  save: css`
    color: ${theme.colors.darkestGray};
  `,
  /* 프로필 수정, 수정 버튼 */
  edit: css`
    color: ${theme.colors.darkestGray};
  `,
  /* 파일 추가 */
  addFile: css`
    background-color: ${theme.colors.bgGray};
    color: ${theme.colors.black};
    border: 0;
    padding: 8px;
    & > span {
      margin-right: 0;
      margin-left: 4px;
    }
  `,
};

export default IconTextButton;
