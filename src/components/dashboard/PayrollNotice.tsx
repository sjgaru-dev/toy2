import React, { useState } from 'react';

import { css } from '@emotion/react';
import { HiX } from 'react-icons/hi';

import moneyImage from '@/assets/images/money.png';
import Button from '@/components/common/Buttons/Button';
import theme from '@/styles/theme';

const PayrollNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleButtonClick = () => {
    // 급여명세서 상세 페이지로 이동
  };

  if (!isVisible) return null;

  return (
    <div css={cardContainerStyle}>
      <button css={closeButtonStyle} onClick={() => setIsVisible(false)}>
        <HiX css={closeIconStyle} />
      </button>
      <h3 css={titleStyle}>
        2024년 7월
        <br /> 급여명세서가 도착했습니다!
      </h3>
      <img src={moneyImage} alt='돈뭉치' css={imageStyle} />
      <Button onClick={handleButtonClick}>조회하기</Button>
    </div>
  );
};

const cardContainerStyle = css`
  position: relative;
  padding: 20px;
  margin: ${theme.fontSizes.small} 1rem;
  border: 1px solid ${theme.colors.borderLightGray};
  border-radius: 8px;
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
  text-align: left;
  background-color: ${theme.colors.white};
`;

const closeButtonStyle = css`
  position: absolute;
  right: 16px;
  border: none;
  background: none;
  cursor: pointer;
`;

const titleStyle = css`
  margin-top: 1rem;
  font-size: ${theme.fontSizes.xxlarge};
  font-weight: 700;
  line-height: 1.4;
`;

const imageStyle = css`
  display: block;
  width: 120px;
  margin: 0 auto 0.5rem;
`;

const closeIconStyle = css`
  width: 20px;
  height: 20px;
  color: ${theme.colors.darkGray};
`;

export default PayrollNotice;
