import React, { useEffect, useMemo, useState } from 'react';

import { css } from '@emotion/react';
import { HiOutlinePencil } from 'react-icons/hi2';
import { useLocation } from 'react-router-dom';

import Button from '@/components/common/buttons/Button';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Modal from '@/components/common/Modal';
import Header from '@/components/layout/Header';
import useScheduleDelete from '@/hooks/useScheduleDelete';
import theme from '@/styles/theme';
import { ScheduleModel } from '@/types/schedule';
import { formatTime, formatOnlyDate } from '@/utils/dailySchedule';

const DailyScheduleDetail: React.FC = () => {
  const location = useLocation();
  const schedule: ScheduleModel = useMemo(() => location.state?.schedule, [location.state]);

  const [text, setText] = useState(schedule.content);
  const { isModalOpen, handleDeleteClick, handleConfirmDelete, handleCancelDelete } =
    useScheduleDelete(schedule);

  useEffect(() => {
    if (schedule) {
      setText(schedule.content);
    }
  }, [schedule]);

  return (
    <div css={wrapper}>
      <div>
        <Header />
      </div>
      <div css={containerStyle}>
        <header css={headerStyle}>
          <div css={titleStyle}>
            <div css={circleStyle(schedule)}></div>
            <h1>{schedule.subject}</h1>
          </div>
          <IconTextButton Icon={HiOutlinePencil} onClick={() => {}}>
            수정
          </IconTextButton>
        </header>
        <section css={contentStyle}>
          <div>
            <span>시작일</span>
            <p>
              <span>{formatOnlyDate(schedule.startDate)}</span>
              <span>{formatTime(schedule.startTime)}</span>
            </p>
          </div>
          <div>
            <span>종료일</span>
            <p>
              <span>{formatOnlyDate(schedule.endDate)}</span>
              <span>{formatTime(schedule.endTime)}</span>
            </p>
          </div>
          <textarea css={textareaStyle} value={text} readOnly>
            {schedule.content}
          </textarea>
          <Button styleType='text' customStyle={buttonStyle} onClick={handleDeleteClick}>
            일정 삭제하기
          </Button>
        </section>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCancelDelete}
          onConfirm={() => handleConfirmDelete()}
          title='일정을 삭제하시겠습니까?'
          confirmText='일정 삭제하기'
          cancelText='취소'
          styleType='secondary'
        />
      )}
    </div>
  );
};

const wrapper = css`
  height: 100vh;
  background-color: ${theme.colors.white};
`;
const containerStyle = css`
  padding: 18px 1rem 1rem;
`;
const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const titleStyle = css`
  display: flex;
  justsify-content: flex-start;
  align-items: center;
  h1 {
    margin-left: 0.5rem;
    font-size: ${theme.fontSizes.xlarge};
    flex-shrink: 1;
  }
`;
const circleStyle = (schedule: ScheduleModel) => css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${schedule.color};
  flex-shrink: 0;
`;
const contentStyle = css`
  
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    p {
      display: flex;
      gap: 1rem;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: ${theme.heights.short};
        font-size: ${theme.fontSizes.normal};
        border-radius: 4px;
    }
  }
`;
const textareaStyle = css`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  letter-spacing: -0.5px; /* 브라우저에 따라 조정 */
  width: 100%;
  height: 140px;
  resize: none;
  color: ${theme.colors.darkestGray};
  font-size: ${theme.fontSizes.normal};
  -webkit-letter-spacing: -1px;
  letter-spacing: 0px;
  line-height: 1.5;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  margin-bottom: 24px;
  padding: 12px;
  outline: none;
`;
const buttonStyle = css`
  background-color: ${theme.colors.bgGray};
`;

export default DailyScheduleDetail;
