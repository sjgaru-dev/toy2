/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';

import { css } from '@emotion/react';
import { Combobox } from '@headlessui/react';
import dayjs from 'dayjs';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import theme from '@/styles/theme';
import { formatTimeString, formatTo12HourTime } from '@/utils/time';

const hours = [...Array(12).keys()].map((hour) => formatTimeString(hour + 1));
const minutes = [...Array(60).keys()].map((minute) => formatTimeString(minute));
const ampm = ['오전', '오후'];

interface TimePickerProps {
  time: string;
  setTime: (time: string) => void;
}

const TimePicker = ({ time, setTime }: TimePickerProps) => {
  const formattedTime = formatTo12HourTime(time);
  const [initAmpm, initTime] = formattedTime.split(' ');
  const [initHour, initMinute] = initTime.split(':').map(Number);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(formatTimeString(initHour));
  const [selectedMinute, setSelectedMinute] = useState(formatTimeString(initMinute));
  const [selectedAmpm, setSelectedAmpm] = useState(initAmpm);

  const timePickerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(timePickerRef, () => setIsOpen(false));

  const onHour = (hour: string) => {
    setSelectedHour(hour);

    const currentTime = dayjs()
      .set('hour', selectedAmpm === '오후' ? Number(hour) + 12 : Number(hour))
      .set('minute', Number(selectedMinute))
      .format('HH:mm');
    setTime(currentTime);
  };
  const onMinute = (minute: string) => {
    setSelectedMinute(minute);

    const currentTime = dayjs()
      .set('hour', selectedAmpm === '오후' ? Number(selectedHour) + 12 : Number(selectedHour))
      .set('minute', Number(minute))
      .format('HH:mm');
    setTime(currentTime);
    setIsOpen(!isOpen);
  };
  const onAmPm = (ampm: string) => {
    setSelectedAmpm(ampm);
    const currentTime = dayjs()
      .set('hour', ampm === '오후' ? Number(selectedHour) + 12 : Number(selectedHour))
      .set('minute', Number(selectedMinute))
      .format('HH:mm');
    setTime(currentTime);
  };

  return (
    <div css={containerStyle} ref={timePickerRef}>
      <input
        type='button'
        value={`${selectedAmpm} ${selectedHour}:${selectedMinute}`}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div css={dropdownStyle}>
          <Combobox as='div'>
            <div css={sectionStyle}>
              {ampm.map((option) => (
                <div
                  key={option}
                  css={optionStyle}
                  className={`${option === selectedAmpm ? 'active' : ''}`}
                  onClick={() => onAmPm(option)}
                >
                  {option}
                </div>
              ))}
            </div>
            <div css={sectionStyle}>
              {hours.map((hour) => (
                <div
                  key={hour}
                  css={optionStyle}
                  className={`${hour === selectedHour ? 'active' : ''}`}
                  onClick={() => onHour(hour)}
                >
                  {hour}
                </div>
              ))}
            </div>
            <div css={sectionStyle}>
              {minutes.map((minute) => (
                <div
                  key={minute}
                  css={optionStyle}
                  className={`${minute === selectedMinute ? 'active' : ''}`}
                  onClick={() => onMinute(minute)}
                >
                  {minute}
                </div>
              ))}
            </div>
          </Combobox>
        </div>
      )}
    </div>
  );
};

const containerStyle = css`
  position: relative;
  display: inline-block;

  input {
    width: 80px;
    height: 32px;
    border: 0;
    border-radius: 4px;
    outline: none;
    font-size: 0.85rem;
    font-weight: 500;
    color: ${theme.colors.darkestGray};
    background-color: ${theme.colors.bgGray};
    text-align: center;
    cursor: pointer;
  }
`;

const dropdownStyle = css`
  z-index: 10;
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  width: 132px;
  padding: 4px 0;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  background: ${theme.colors.white};

  > div {
    display: flex;
    font-size: ${theme.fontSizes.normal};
  }
`;

const sectionStyle = css`
  height: 120px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const optionStyle = css`
  padding: 8px 12px;
  cursor: pointer;

  &.active {
    background-color: ${theme.colors.bgGray};
    color: ${theme.colors.primary};
  }
`;

export default TimePicker;
