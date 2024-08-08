import React, { Fragment, useEffect } from 'react';

import { css } from '@emotion/react';
import { Transition } from '@headlessui/react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi2';

import useToast from '@/hooks/useToast';
import theme from '@/styles/theme';
import '@/styles/transition.css';

interface ToastProps {
  duration?: number;
  status?: 'success' | 'fail';
}

const Toast: React.FC<ToastProps> = ({ duration = 2000, status = 'success' }) => {
  const { isToastOn, toastMsg, onClose } = useToast();

  useEffect(() => {
    if (isToastOn) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isToastOn, onClose, duration]);

  return (
    <Transition
      show={isToastOn}
      appear={isToastOn}
      as={Fragment}
      enterFrom='transition-enter-from'
      enterTo='transition-enter-to'
      leaveFrom='transition-leave-from'
      leaveTo='transition-leave-to'
    >
      <div css={toastStyle}>
        <div css={iconContainerStyle}>
          {status === 'success' ? (
            <HiCheckCircle css={successStyle} />
          ) : (
            <HiXCircle css={failStyle} />
          )}
        </div>
        <span css={messageStyle}>{toastMsg}</span>
      </div>
    </Transition>
  );
};

const toastStyle = css`
  width: calc(100vw - 32px);
  max-width: 468px;
  position: fixed;
  bottom: 96px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  border-radius: 4px;
  background-color: ${theme.colors.toastGray};
  color: ${theme.colors.white};
  z-index: 1000;
  transition: all 0.2s ease-in;
`;

const iconContainerStyle = css`
  position: relative;
  background-color: ${theme.colors.white};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    line-height: 1;
  }
`;

const successStyle = css`
  color: ${theme.colors.primary};
`;

const failStyle = css`
  color: ${theme.colors.alertRed};
`;

const messageStyle = css`
  font-size: ${theme.fontSizes.normal};
  font-weight: 500;
`;

export default Toast;
