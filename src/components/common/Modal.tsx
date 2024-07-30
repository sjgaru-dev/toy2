import React, { Fragment } from 'react';

import { css } from '@emotion/react';
import { Dialog, Transition } from '@headlessui/react';

import theme from '@/styles/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    color?: 'primary' | 'danger';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  children?: React.ReactNode;
  variant?: 'default' | 'bottomSheet';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  primaryAction,
  secondaryAction,
  children,
  variant = 'default',
}) => {
  const handlePrimaryAction = () => {
    if (primaryAction) {
      primaryAction.onClick();
    }
  };

  const handleSecondaryAction = () => {
    if (secondaryAction) {
      secondaryAction.onClick();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' css={dialogStyle} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div css={overlayStyle} />
        </Transition.Child>

        <div css={containerStyle(variant)}>
          <div css={contentContainerStyle(variant)}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom={
                variant === 'bottomSheet' ? 'transform translate-y-full' : 'opacity-0 scale-95'
              }
              enterTo={
                variant === 'bottomSheet' ? 'transform translate-y-0' : 'opacity-100 scale-100'
              }
              leave='ease-in duration-200'
              leaveFrom={
                variant === 'bottomSheet' ? 'transform translate-y-0' : 'opacity-100 scale-100'
              }
              leaveTo={
                variant === 'bottomSheet' ? 'transform translate-y-full' : 'opacity-0 scale-95'
              }
            >
              <Dialog.Panel css={panelStyle(variant)}>
                <Dialog.Title as='h3' css={titleStyle(variant)}>
                  {title}
                </Dialog.Title>
                {children && <div css={childrenStyle}>{children}</div>}
                <div css={actionContainerStyle(variant)}>
                  {primaryAction && (
                    <button
                      css={[buttonStyle, primaryButtonStyle(primaryAction.color)]}
                      onClick={handlePrimaryAction}
                    >
                      {primaryAction.label}
                    </button>
                  )}
                  {secondaryAction && (
                    <button
                      css={[buttonStyle, secondaryButtonStyle]}
                      onClick={handleSecondaryAction}
                    >
                      {secondaryAction.label}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const dialogStyle = css`
  position: relative;
  z-index: 10;
`;

const overlayStyle = css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
`;

const containerStyle = (variant: 'default' | 'bottomSheet') => css`
  position: fixed;
  inset: 0;
  overflow-y: auto;
  ${variant === 'bottomSheet' &&
  `
    display: flex;
    align-items: flex-end;
  `}
`;

const contentContainerStyle = (variant: 'default' | 'bottomSheet') => css`
  ${variant === 'default' &&
  `
    display: flex;
    min-height: 100%;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  `}
`;

const panelStyle = (variant: 'default' | 'bottomSheet') => css`
  background-color: ${theme.colors.white};
  ${variant === 'default'
    ? `
    width: 100%;
    max-width: 28rem;
    border-radius: 0.5rem;
    padding: 1.5rem;
  `
    : `
    width: 100%;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;

const titleStyle = (variant: 'default' | 'bottomSheet') => css`
  text-align: center;
  font-size: ${theme.fontSizes.large};
  font-weight: 700;
  margin-bottom: 1.5rem;
  ${variant === 'bottomSheet' &&
  `
    width: 100%;
  `}
`;

const childrenStyle = css`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const actionContainerStyle = (variant: 'default' | 'bottomSheet') => css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  ${variant === 'bottomSheet' &&
  `
    width: 100%;
    max-width: 100%;
    padding-bottom: 1rem;
  `}
`;
const buttonStyle = css`
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: ${theme.fontSizes.normal};
  font-weight: 500;
  width: 100%;
  border: none;
  cursor: pointer;
  text-align: center;
`;

const primaryButtonStyle = (color: 'primary' | 'danger' = 'primary') => css`
  background-color: ${color === 'primary' ? theme.colors.primary : theme.colors.alertRed};
  color: ${theme.colors.white};
`;

const secondaryButtonStyle = css`
  background-color: transparent;
  color: ${theme.colors.darkGray};
`;

export default Modal;
