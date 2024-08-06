import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Toast from '@/components/common/Toast';
import Navbar from '@/components/layout/Navbar';
import useToast from '@/hooks/useToast';

const RootLayout = () => {
  const { isToastOn, toastMsg, onClose } = useToast();

  return (
    <div css={wrapperStyle}>
      <Navbar />
      <main>
        <Outlet />
      </main>

      <Toast isVisible={isToastOn} onClose={onClose}>
        {toastMsg}
      </Toast>
    </div>
  );
};

const wrapperStyle = css`
  max-width: 500px;
  min-height: 100vh;
  margin: 0 auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export default RootLayout;
