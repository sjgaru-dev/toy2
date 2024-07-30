import React, { Fragment, useEffect } from 'react';

import { css, keyframes } from '@emotion/react';
import { Transition } from '@headlessui/react';

import theme from '@/styles/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

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
      enter='enter'
      enterFrom='enterFrom'
      enterTo='enterTo'
      leave='leave'
      leaveFrom='leaveFrom'
      leaveTo='leaveTo'
    >
      <div css={toastStyle} className={isVisible ? 'enter' : 'leave'}>
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
  padding: 16px 32px;
  border-radius: 4px;
  position: fixed;
  bottom: ${theme.heights.tall};
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1000;
  width: 90%;
  justify-content: center;
  transition:
    opacity 200ms ease-in,
    transform 200ms ease-in;

  &.enter {
    animation: ${fadeIn} 300ms ease-out;
  }

  &.leave {
    animation: ${fadeOut} 300ms ease-in;
  }
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
  font-size: ${theme.fontSizes.large};
  line-height: 1;
`;

const messageStyle = css`
  font-size: ${theme.fontSizes.large};
  font-weight: 500;
`;

export default Toast;
