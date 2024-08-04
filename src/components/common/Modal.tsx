import React from 'react';

import { css } from '@emotion/react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

import Button from './buttons/Button';
import theme from '@/styles/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  cancelText?: string;
  styleType?: 'primary' | 'secondary';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText = '취소',
  styleType = 'primary',
}) => (
  <Dialog open={isOpen} onClose={onClose} css={dialogStyle}>
    <div css={overlayStyle} />
    <div css={containerStyle}>
      <DialogPanel css={styleType === 'primary' ? panelStylePrimary : panelStyleSecondary}>
        <DialogTitle css={styleType === 'primary' ? titleStylePrimary : titleStyleSecondary}>
          {title}
        </DialogTitle>
        <div css={buttonContainerStyle}>
          <Button
            onClick={onConfirm}
            styleType='primary'
            customStyle={
              styleType === 'primary' ? confirmButtonStylePrimary : confirmButtonStyleSecondary
            }
          >
            {confirmText}
          </Button>
          <Button
            onClick={onClose}
            styleType='secondary'
            customStyle={
              styleType === 'primary' ? cancelButtonStylePrimary : cancelButtonStyleSecondary
            }
          >
            {cancelText}
          </Button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);

const dialogStyle = css`
  position: fixed;
  inset: 0;
  z-index: 1000;
  overflow-y: auto;
`;

const overlayStyle = css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const containerStyle = css`
  display: flex;
  min-height: 100vh;
  align-items: flex-end;
  justify-content: center;
`;

const panelStylePrimary = css`
  width: 100%;
  background-color: ${theme.colors.white};
  padding: 20px;
  border-radius: 16px 16px 0 0;
  z-index: 1001;
`;

const panelStyleSecondary = css`
  width: 100%;
  background-color: ${theme.colors.white};
  padding: 20px;
  border-radius: 16px 16px 0 0;
  z-index: 1001;
`;

const titleStylePrimary = css`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.black};
  text-align: center;
  margin-bottom: 20px;
`;

const titleStyleSecondary = css`
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

const confirmButtonStylePrimary = css`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
`;

const confirmButtonStyleSecondary = css`
  background-color: ${theme.colors.lightestGray};
  color: ${theme.colors.alertRed};

  &:hover {
    background-color: ${theme.colors.hoverLightGray};
  }
`;

const cancelButtonStylePrimary = css`
  background-color: ${theme.colors.white};
  color: ${theme.colors.darkGray};
`;

const cancelButtonStyleSecondary = css`
  background-color: ${theme.colors.white};
  color: ${theme.colors.darkGray};
`;

export default Modal;
