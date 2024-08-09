import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/images/logo_icon.svg';
import Button from '@/components/common/buttons/Button';
import theme from '@/styles/theme';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div css={containerStyle}>
      <div css={h1Style}>404</div>
      <img css={logo} src={Logo} alt='logo' />
      <p css={pStyle}>페이지를 찾을 수 없습니다</p>
      <p className='contents'>
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. <br />
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
      </p>
      <Button onClick={handleGoBack}>이전 페이지로 이동</Button>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${theme.colors.white};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .contents {
    margin-bottom: 24px;
    font-size: ${theme.fontSizes.normal};
    text-align: center;
    line-height: 140%;
  }

  button {
    margin-bottom: 40%;
  }
`;

const logo = css`
  width: 150px;
  margin-top: 20px;
`;

const h1Style = css`
  font-size: 6vh;
  margin-top: 2vh;
  font-weight: 900;
  color: ${theme.colors.primary};
`;

const pStyle = css`
  font-size: 20px;
  font-weight: 600;
  margin: 12px 0;

  color: #17583d;
`;

export default NotFoundPage;
