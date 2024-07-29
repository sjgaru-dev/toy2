import { css } from '@emotion/react';
import black from '/src/assets/fonts/woff/Pretendard-Black.woff';
import extraBold from '/src/assets/fonts/woff/Pretendard-ExtraBold.woff';
import bold from '/src/assets/fonts/woff/Pretendard-Bold.woff';
import semiBold from '/src/assets/fonts/woff/Pretendard-SemiBold.woff';
import medium from '/src/assets/fonts/woff/Pretendard-Medium.woff';
import regular from '/src/assets/fonts/woff/Pretendard-Regular.woff';
import light from '/src/assets/fonts/woff/Pretendard-Light.woff';
import extraLight from '/src/assets/fonts/woff/Pretendard-ExtraLight.woff';
import thin from '/src/assets/fonts/woff/Pretendard-Thin.woff';

const FontStyles = css`
  @font-face {
    font-family: 'Pretendard';
    src: url(${black}) format('woff');
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${extraBold}) format('woff');
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${bold}) format('woff');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${semiBold}) format('woff');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${medium}) format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url(${regular}) format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${light}) format('woff');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${extraLight}) format('woff');
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${thin}) format('woff');
    font-weight: 100;
    font-style: normal;
  }
`;

export default FontStyles;
