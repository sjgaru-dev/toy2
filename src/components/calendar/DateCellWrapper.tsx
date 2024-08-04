/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import dayjs from 'dayjs';

import theme from '@/styles/theme';
import { DateCellProps } from '@/types/calendar';

interface DateCellWrapper extends DateCellProps {
  activeDate: Date;
  setActiveDate: (date: Date) => void;
}

const DateCellWrapper = ({ value, activeDate, setActiveDate }: DateCellWrapper) => {
  const isActive = dayjs(value).isSame(activeDate, 'day');

  const onCell = () => {
    setActiveDate(value);
  };

  return (
    <div
      css={dateCellWrapperStyle}
      onClick={onCell}
      className={`${isActive ? 'active' : ''}`}
    ></div>
  );
};

const dateCellWrapperStyle = css`
  z-index: 10;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: pointer;

  &.active {
    z-index: 0;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.bgGray};
  }
`;

export default DateCellWrapper;
