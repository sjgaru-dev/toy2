/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';

import { css } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import theme from '@/styles/theme';
import {
  formatYearMonthDay,
  getCurrentMonthDays,
  getNextMonthDays,
  getPreviousMonthDays,
} from '@/utils/calendar';

dayjs.locale('ko');

const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

interface DatePicker {
  selected: Date;
  setSelected: (value: Date) => void;
}

const DatePicker = ({ selected, setSelected }: DatePicker) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs(selected).startOf('month'));

  const datePickerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(datePickerRef, () => setIsOpen(false));

  const prevMonthDays = getPreviousMonthDays(currentMonth);
  const currentMonthDays = getCurrentMonthDays(currentMonth);
  const nextMonthDays = getNextMonthDays(currentMonth);

  const onClickDate = (date: number) => {
    const clickedDate = currentMonth.date(date).toDate();
    setSelected(clickedDate);
    setIsOpen(!isOpen);
  };

  const onClickDateButton = () => setIsOpen(!isOpen);

  const onPreviousMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const onNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

  return (
    <div css={datePickerStyle} ref={datePickerRef}>
      <input
        type='button'
        value={formatYearMonthDay(selected)}
        className='date-input'
        onClick={onClickDateButton}
      />
      <div className={`${isOpen ? 'open ' : ''}calendar-container`}>
        <div className='calendar-header'>
          <span>{currentMonth.format('YYYY년 MM월')}</span>
          <div className='button-container'>
            <button type='button' onClick={onPreviousMonth}>
              <HiChevronLeft />
            </button>
            <button type='button' onClick={onNextMonth}>
              <HiChevronRight />
            </button>
          </div>
        </div>
        <div className='calendar'>
          <div className='weeks'>
            {WEEKS.map((week, index) => (
              <div key={index}>{week}</div>
            ))}
          </div>
          <div className='days'>
            {prevMonthDays.map((day, index) => (
              <div key={index} className='day inactive'>
                {day}
              </div>
            ))}
            {currentMonthDays.map((day, index) => (
              <div
                key={index}
                className={`day ${dayjs(selected).date() === day ? 'selected' : ''}`}
                onClick={() => onClickDate(day)}
              >
                {day}
              </div>
            ))}
            {nextMonthDays.map((day, index) => (
              <div key={index} className='day inactive'>
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const datePickerStyle = css`
  position: relative;

  .date-input {
    width: 90px;
    height: 32px;
    border: 0;
    border-radius: 4px;
    outline: none;
    font-size: 0.85rem;
    font-weight: 500;
    color: ${theme.colors.darkestGray};
    background-color: ${theme.colors.bgGray};
    text-align: center;
    caret-color: transparent;
    cursor: pointer;
  }

  .calendar-container {
    z-index: 100;
    position: absolute;
    top: 36px;
    right: 0;
    display: none;
    padding: 8px 12px;
    border: 1px solid ${theme.colors.lightGray};
    border-radius: 4px;
    background-color: ${theme.colors.white};
    font-size: ${theme.fontSizes.normal};

    &.open {
      display: block;
    }
  }

  .calendar-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding-left: 8px;
    margin-bottom: 8px;

    > span {
      width: 80px;
    }

    .button-container {
      display: flex;
      gap: 4px;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid ${theme.colors.lightGray};
        font-weight: bold;
        background-color: transparent;
      }
    }
  }

  .calendar {
    .weeks {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
      text-align: center;
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;

      .day {
        text-align: center;
        width: 28px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;

        &.inactive {
          color: ${theme.colors.darkGray};
        }
        &.selected {
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          border-radius: 50%;
        }
      }
    }
  }
`;

export default DatePicker;
