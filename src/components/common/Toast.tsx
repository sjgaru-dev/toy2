import React, { Fragment, useEffect } from 'react';

import { css } from '@emotion/react';
import { Transition } from '@headlessui/react';

import theme from '@/styles/theme';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, duration = 2000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <Transition
      show={isVisible}
      as={Fragment}
      enter='transition ease-out duration-300'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-200'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      <div css={toastStyle}>
        <div css={checkmarkContainerStyle}>
          <span css={checkmarkStyle}>✓</span>
        </div>
        <span css={messageStyle}>{message}</span>
      </div>
    </Transition>
  );
};

const toastStyle = css`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.darkGray};
  color: ${theme.colors.white};
  padding: 0.75rem 1rem;
  border-radius: 4px;
  position: fixed;
  bottom: ${theme.heights.tall};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 100%;
  justify-content: center;
`;

const checkmarkContainerStyle = css`
  background-color: ${theme.colors.primary};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

const checkmarkStyle = css`
  color: ${theme.colors.white};
  font-size: 12px;
  line-height: 1;
`;

const messageStyle = css`
  font-size: ${theme.fontSizes.normal};
  font-weight: 500;
`;

export default Toast;
