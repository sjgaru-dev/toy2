import { css } from '@emotion/react';
import Black from '/src/assets/fonts/woff/Pretendard-Black.woff';
import ExtraBold from '/src/assets/fonts/woff/Pretendard-ExtraBold.woff';
import Bold from '/src/assets/fonts/woff/Pretendard-Bold.woff';
import SemiBold from '/src/assets/fonts/woff/Pretendard-SemiBold.woff';
import Medium from '/src/assets/fonts/woff/Pretendard-Medium.woff';
import Regular from '/src/assets/fonts/woff/Pretendard-Regular.woff';
import Light from '/src/assets/fonts/woff/Pretendard-Light.woff';
import ExtraLight from '/src/assets/fonts/woff/Pretendard-ExtraLight.woff';
import Thin from '/src/assets/fonts/woff/Pretendard-Thin.woff';

const fontStyles = css`
  @font-face {
    font-family: 'Pretendard';
    src: url(${Black}) format('woff');
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${ExtraBold}) format('woff');
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Bold}) format('woff');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${SemiBold}) format('woff');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Medium}) format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url(${Regular}) format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Light}) format('woff');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${ExtraLight}) format('woff');
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Thin}) format('woff');
    font-weight: 100;
    font-style: normal;
  }
`;

export default fontStyles;
