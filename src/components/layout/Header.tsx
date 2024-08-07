import { css } from '@emotion/react';
import { HiChevronLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import theme from '@/styles/theme';

interface HeaderProps {
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header css={headerStyle}>
      <button css={buttonStyle} onClick={handleBack}>
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
