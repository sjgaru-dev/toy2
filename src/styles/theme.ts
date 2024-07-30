const colors = {
  primary: '#2DC384',
  hoverPrimary: '#46AF83',
  supportOrange: '#FF8E3D',
  alertRed: '#E45148',
  black: '#121212',
  white: '#ffffff',
  darkestGray: '#333D4B',
  darkGray: '#8B95A1',
  lightGray: '#E3E5EB',
  lightestGray: '#F2F3F6',
  hoverLightGray: '#D5D7DD',
  paleRed: '#F68383',
  paleOrange: '#FFAB8C',
  paleYellow: '#FAD781',
  paleGreen: '#95DB94',
  paleBlue: '#A2CDFF',
  palePurple: '#C394FF',
  bgGray: '#F6F7F9', // 배경색
};

const fontSizes = {
  small: '10px',
  medium: '12px',
  large: '14px',
  xlarge: '16px',
  xxlarge: '18px',
  xxxlarge: '20px',
};

// input, button, toast 등의 높이를 정의
const heights = {
  short: '32px',
  medium: '40px',
  tall: '50px',
  xtall: '60px',
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSizes;
export type HeightsTypes = typeof heights;

interface Theme {
  colors: ColorsTypes;
  fontSizes: FontSizeTypes;
  heights: HeightsTypes;
}
// ThemeProvider 적용하기 위해 Theme 타입을 정의
const theme: Theme = {
  colors,
  fontSizes,
  heights,
};

export default theme;
