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
    <div css={bodyStyle}>
      <img css={logo} src={Logo} alt='logo' />

      <div css={h1Style}>4 0 4 에러 </div>
      <div css={pStyle}>페이지가 없습니다.</div>
      <Button onClick={handleGoBack}>Go Back</Button>
    </div>
  );
};

const bodyStyle = css`
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
  width: 60vw;
`;

const h1Style = css`
  font-size: 10vw;
  margin-top: 50px;

  color: #2dc384;
`;

const pStyle = css`
  font-size: 7vw;
  margin: 30px 0 50px 0;
  color: #17583d;
`;

export default NotFoundPage;
