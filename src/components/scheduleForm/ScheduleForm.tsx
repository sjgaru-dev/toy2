/* eslint-disable no-unused-vars */
import { FormEvent, useRef, useState } from 'react';

import { css } from '@emotion/react';
import dayjs from 'dayjs';

import Button from '@/components/common/buttons/Button';
import Select from '@/components/common/Select';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import ColorPicker, { ColorsType } from '@/components/scheduleForm/ColorPicker';
import TimePicker from '@/components/scheduleForm/TimePicker';
import theme from '@/styles/theme';
import { ScheduleFormDataModel } from '@/types/schedule';

export const alarmOptions = ['없음', '10분 전', '30분 전', '정각'];

interface ScheduleFormProps {
  initEnableAllDay?: boolean;
  initSelectedAlarmOption?: (typeof alarmOptions)[number];
  initSelectedColor?: ColorsType;
  initStartTime?: string;
  initEndTime?: string;
  onSubmit: (data: ScheduleFormDataModel) => void;
}

const ScheduleForm = ({
  initEnableAllDay = false,
  initSelectedAlarmOption = alarmOptions[0],
  initSelectedColor = 'red',
  initStartTime = dayjs().minute(0).format('HH:mm'),
  initEndTime = dayjs().minute(0).format('HH:mm'),
  onSubmit,
}: ScheduleFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [enableAllDay, setEnableAllDay] = useState(initEnableAllDay);
  const [selectedAlarmOption, setSelectedAlarmOption] = useState(initSelectedAlarmOption);
  const [selectedColor, setSelectedColor] = useState(initSelectedColor);
  const [startTime, setStartTime] = useState(initStartTime);
  const [endTime, setEndTime] = useState(initEndTime);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // onSubmit(data)
  };

  return (
    <>
      <form onSubmit={onSubmitForm} css={formStyle} className='wrapper' ref={formRef}>
        <input type='text' name='subject' css={subjectInputStyle} placeholder='새로운 일정' />
        <div css={divContainerStyle}>
          <span>하루 종일</span>
          <ToggleSwitch enabled={enableAllDay} setEnabled={setEnableAllDay} />
        </div>
        <div css={divContainerStyle}>
          <span>시작일</span>
          <div css={datePickerContainerStyle}>
            <button type='button'>7월 25일</button>
            {!enableAllDay && <TimePicker time={startTime} setTime={setStartTime} />}
          </div>
        </div>
        <div css={divContainerStyle}>
          <span>종료일</span>
          <div css={datePickerContainerStyle}>
            <button type='button'>7월 25일</button>
            {!enableAllDay && <TimePicker time={endTime} setTime={setEndTime} />}
          </div>
        </div>
        <div css={divContainerStyle}>
          <span>알림</span>
          <Select
            options={alarmOptions}
            selected={selectedAlarmOption}
            onChange={setSelectedAlarmOption}
          />
        </div>
        <div css={divContainerStyle}>
          <span>색상</span>
          <ColorPicker selected={selectedColor} setSelected={setSelectedColor} />
        </div>
        <textarea name='content' css={textareaStyle} placeholder='메모를 입력하세요.' />
        <div css={buttonContainerStyle}>
          <Button type='submit'>일정 추가하기</Button>
          <Button styleType='text'>취소하기</Button>
        </div>
      </form>
    </>
  );
};

const formStyle = css`
  padding-bottom: 90px;
  background-color: ${theme.colors.white};
`;

const subjectInputStyle = css`
  width: 100%;
  padding: 20px 0 24px;
  border: 0;
  outline: none;
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
`;

const divContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${theme.heights.tall};

  span {
    font-size: ${theme.fontSizes.normal};
    font-weight: 500;
  }
`;

const datePickerContainerStyle = css`
  display: flex;
  gap: 4px;

  button {
    width: 80px;
    height: 32px;
    border-radius: 4px;
    font-weight: 500;
    color: ${theme.colors.darkestGray};
    background-color: ${theme.colors.bgGray};
  }
`;

const textareaStyle = css`
  width: 100%;
  height: 140px;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid ${theme.colors.lightGray};
  outline: none;
  font-size: ${theme.fontSizes.normal};
  border-radius: 4px;
  resize: none;
`;

const buttonContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default ScheduleForm;
