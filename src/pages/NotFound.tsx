import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/images/logo.svg';
import Button from '@/components/common/buttons/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div css={constainerStyle}>
      <img css={logo} src={Logo} alt='logo' />

      <div css={h1Style}>4 0 4 에러 </div>
      <div css={pStyle}>페이지가 없습니다.</div>
      <Button onClick={handleGoBack}>Go Back</Button>
    </div>
  );
};

const constainerStyle = css`
  max-width: 500px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const logo = css`
  max-width: 500px;
  width: 70vw;
`;

const h1Style = css`
  font-size: 6vh;
  margin-top: 2vh;
  color: #2dc384;
`;

const pStyle = css`
  font-size: 4vh;
  margin: 2vh 0 3vh 0;

  color: #17583d;
`;

export default NotFoundPage;
