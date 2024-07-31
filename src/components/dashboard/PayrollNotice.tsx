import React, { useState } from 'react';

import { css } from '@emotion/react';
import { FcMoneyTransfer } from 'react-icons/fc';
import { HiX } from 'react-icons/hi';

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
      <h3 css={titleStyle}>2024년 7월</h3>
      <p css={descriptionStyle}>급여명세서가 도착했습니다!</p>
      <FcMoneyTransfer css={iconStyle} />
      <Button onClick={handleButtonClick}>조회하기</Button>
    </div>
  );
};

const cardContainerStyle = css`
  margin: 1rem;
  border: 1px solid ${theme.colors.borderLightGray};
  border-radius: 8px;
  padding: 16px;
  background-color: ${theme.colors.white};
  text-align: left;
  position: relative;
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
`;

const closeButtonStyle = css`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
`;

const iconStyle = css`
  width: 80px;
  height: 80px;
  margin: 16px auto;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const closeIconStyle = css`
  width: 20px;
  height: 20px;
  color: ${theme.colors.darkGray};
`;

const titleStyle = css`
  margin-bottom: 8px;
`;

const descriptionStyle = css`
  margin-top: 8px;
  margin-bottom: 16px;
`;

export default PayrollNotice;
