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
      afterLeave={onClose}
    >
      <div css={toastStyle}>
        <span css={checkmarkStyle}>✓</span>
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
  padding: ${theme.heights.short} ${theme.heights.medium};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: ${theme.heights.tall};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const checkmarkStyle = css`
  color: ${theme.colors.primary};
  margin-right: 10px;
  font-size: ${theme.fontSizes.xlarge};
`;

const messageStyle = css`
  font-size: ${theme.fontSizes.normal};
  font-weight: 500;
`;

export default Toast;
