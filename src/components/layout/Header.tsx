import { css } from '@emotion/react';
import { HiChevronLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import theme from '@/styles/theme';

const Header = () => {
  const navigate = useNavigate();

  const onBack = () => navigate(-1);

  return (
    <header css={headerStyle}>
      <button css={buttonStyle} onClick={onBack}>
        <HiChevronLeft />
      </button>
    </header>
  );
};

const headerStyle = css`
  display: flex;
  align-items: center;
  height: ${theme.heights.xtall};
  background-color: ${theme.colors.white};
`;

const buttonStyle = css`
  width: 50px;
  height: 50px;
  background-color: transparent;
  font-size: ${theme.fontSizes.xxlarge};
`;

export default Header;
