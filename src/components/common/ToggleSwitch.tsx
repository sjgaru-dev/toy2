/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import { Switch } from '@headlessui/react';

import theme from '@/styles/theme';

interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

const ToggleSwitch = ({ enabled, setEnabled }: ToggleSwitchProps) => {
  const onToggle = () => setEnabled(!enabled);

  return (
    <Switch css={switchStyle(enabled)} onClick={onToggle} aria-checked={enabled}>
      <span css={switchThumbStyle(enabled)} />
    </Switch>
  );
};

const switchStyle = (enabled: boolean) => css`
  display: flex;
  align-items: center;
  width: 44px;
  height: 24px;
  padding: 2px;
  border-radius: 12px;
  background-color: ${enabled ? theme.colors.primary : theme.colors.lightGray};
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
`;

const switchThumbStyle = (enabled: boolean) => css`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${theme.colors.white};
  transform: ${enabled ? 'translateX(20px)' : 'translateX(0)'};
  transition: transform 0.2s ease-in-out;
`;

export default ToggleSwitch;
