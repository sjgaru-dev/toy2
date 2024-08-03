/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

import theme from '@/styles/theme';
import { ToolbarProps } from '@/types/calendar';

interface CalendarToolbarProps extends ToolbarProps {
  setActiveDate: (date: Date) => void;
}

const CalendarToolbar = ({ date, onNavigate, setActiveDate }: CalendarToolbarProps) => {
  const dateLabel = dayjs(date).format('YYYY년 M월');

  const onPrev = () => onNavigate('PREV');
  const onNext = () => onNavigate('NEXT');
  const onToday = () => {
    onNavigate('TODAY');
    setActiveDate(new Date());
  };

  return (
    <div css={toolbarContainerStyle}>
      <div css={dateContainerStyle}>
        <h2 css={dateStyle}>{dateLabel}</h2>
        <button onClick={onPrev}>
          <HiChevronLeft />
        </button>
        <button onClick={onNext}>
          <HiChevronRight />
        </button>
      </div>
      <button css={todayButtonStyle} onClick={onToday}>
        오늘
      </button>
    </div>
  );
};

const toolbarContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.2rem;
`;

const dateContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${theme.colors.lightGray};
    font-weight: bold;
    background-color: transparent;
  }
`;

const dateStyle = css`
  margin-right: 4px;
  font-weight: bold;
  font-size: ${theme.fontSizes.large};
`;

const todayButtonStyle = css`
  padding: 0 1rem;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  user-select: none;
`;

export default CalendarToolbar;
