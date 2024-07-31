import React from 'react';

import { css } from '@emotion/react';
import { Dialog } from '@headlessui/react';

import Button from './Button';
import theme from '@/styles/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  cancelText: string;
  variant: 'center' | 'bottom';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText,
  variant,
}) => (
  <Dialog open={isOpen} onClose={onClose} css={dialogStyle}>
    <div css={overlayStyle} />
    <div css={containerStyle(variant)}>
      <Dialog.Panel css={panelStyle(variant)}>
        <Dialog.Title css={titleStyle}>{title}</Dialog.Title>
        <div css={buttonContainerStyle}>
          <Button
            label={confirmText}
            onClick={onConfirm}
            styleType='primary'
            customStyle={confirmButtonStyle(variant)}
          />
          <Button
            label={cancelText}
            onClick={onClose}
            styleType='secondary'
            customStyle={cancelButtonStyle}
          />
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

const dialogStyle = css`
  position: fixed;
  inset: 0;
  z-index: 10;
  overflow-y: auto;
`;

const overlayStyle = css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const containerStyle = (variant: 'center' | 'bottom') => css`
  display: flex;
  min-height: 100vh;
  align-items: ${variant === 'center' ? 'center' : 'flex-end'};
  justify-content: center;
`;

const panelStyle = (variant: 'center' | 'bottom') => css`
  width: ${variant === 'center' ? '90%' : '100%'};
  max-width: ${variant === 'center' ? '400px' : 'none'};
  background-color: ${theme.colors.white};
  padding: 20px;
  border-radius: ${variant === 'center' ? '8px' : '16px 16px 0 0'};
  z-index: 20;
`;

const titleStyle = css`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.black};
  text-align: center;
  margin-bottom: 20px;
`;

const buttonContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const confirmButtonStyle = (variant: 'center' | 'bottom') => css`
  background-color: ${variant === 'center' ? theme.colors.primary : theme.colors.lightestGray};
  color: ${variant === 'center' ? theme.colors.white : theme.colors.alertRed};

  &:hover {
    ${variant === 'bottom' &&
    `
      background-color: ${theme.colors.lightGray};
    `}
  }
`;

const cancelButtonStyle = css`
  background-color: ${theme.colors.white};
  color: ${theme.colors.darkGray};
`;

export default Modal;
