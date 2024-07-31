import React, { useState } from 'react';

import { css } from '@emotion/react';
import { Dialog, Description, DialogPanel, DialogTitle } from '@headlessui/react';
import { FcMoneyTransfer } from 'react-icons/fc';
import { HiX } from 'react-icons/hi';

import Button from './Buttons/Button';
import theme from '@/styles/theme';

const cardContainerStyle = css`
  border: 1px solid ${theme.colors.borderLightGray};
  border-radius: 8px;
  padding: 16px;
  background-color: ${theme.colors.white};
  width: 350px;
  text-align: left;
  position: relative;
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
`;

const closeButtonStyle = css`
  position: absolute;
  top: 10px;
  right: 2px;
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

const dialogContainerStyle = css`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${theme.colors.bgGray};
`;

const SalaryCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleButtonClick = () => {
    // 급여명세서 상세 페이지로 이동
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div css={dialogContainerStyle}>
        <DialogPanel css={cardContainerStyle}>
          <DialogTitle as='div'>
            <button css={closeButtonStyle} onClick={() => setIsOpen(false)}>
              <HiX css={closeIconStyle} />
            </button>
            <h3>2024년 7월</h3>
          </DialogTitle>
          <Description>
            <p>급여명세서가 도착했습니다!</p>
          </Description>
          <FcMoneyTransfer css={iconStyle} />
          <Button onClick={handleButtonClick}>조회하기</Button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SalaryCard;
