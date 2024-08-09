import React, { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { HiOutlinePencil } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/common/buttons/Button';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Modal from '@/components/common/Modal';
import Header from '@/components/layout/Header';
import { schedulePickerColors } from '@/constants/colors';
import { PATH } from '@/constants/path';
import useFetchSchedule from '@/hooks/useFetchSchedule';
import useToast from '@/hooks/useToast';
import { useAppDispatch } from '@/store/hooks';
import { deleteScheduleById } from '@/store/reducer/scheduleSlice';
import theme from '@/styles/theme';
import { ScheduleModel } from '@/types/schedule';
import { formatTime, formatOnlyDate } from '@/utils/dailySchedule';

const DailyScheduleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // DailySchedule 에서 넘어온 파라미터
  const { schedule, status } = useFetchSchedule(); // 전체 일정 데이터
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toastTrigger } = useToast();
  const [currentSchedule, setCurrentSchedule] = useState<ScheduleModel | null>(null);
  // const currentSchedule = schedule?.find((s) => s.id === parseInt(id!, 10));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getScheduleData = (
    schedules: ScheduleModel[],
    scheduleId: string
  ): ScheduleModel | undefined =>
    schedules.find((schedule) => schedule.id === parseInt(scheduleId, 10));

  useEffect(() => {
    if (status === 'succeeded' && schedule && id) {
      const foundSchedule = getScheduleData(schedule, id);
      if (foundSchedule) {
        setCurrentSchedule(foundSchedule);
      } else {
        console.error(`일정 ID ${id}를 찾을 수 없습니다.`);
        // 여기서 사용자에게 알림을 줄 수 있습니다.
      }
      setIsLoading(false);
    } else if (status === 'failed') {
      console.error('일정을 불러오는데 실패했습니다.');
      setIsLoading(false);
    }
  }, [status, schedule, id]);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (status !== 'loading' && schedule) {
      setIsLoading(false);
    }
  }, [status, schedule]);

  if (isLoading) {
    return null; // 또는 로딩 인디케이터를 표시할 수 있습니다.
  }

  if (!currentSchedule) {
    return null; // 또는 일정을 찾을 수 없다는 메시지를 표시할 수 있습니다.
  }
  const handleConfirmDelete = async () => {
    try {
      await dispatch(
        deleteScheduleById({
          id: currentSchedule.id,
          startDate: currentSchedule.startDate,
          endDate: currentSchedule.endDate,
        })
      ).unwrap();
      setIsModalOpen(false);
      toastTrigger('일정이 삭제되었습니다.');
      navigate(PATH.SCHEDULE);
    } catch (error) {
      console.error('Failed to delete schedule:', error);
      toastTrigger('일정 삭제에 실패했습니다.');
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div css={wrapper}>
      <div>
        <Header />
      </div>
      <div css={containerStyle}>
        <header css={headerStyle}>
          <div css={titleStyle}>
            <div css={circleStyle(currentSchedule)}></div>
            <h1>{currentSchedule.subject}</h1>
          </div>
          <IconTextButton
            Icon={HiOutlinePencil}
            onClick={() => {
              navigate(`${PATH.SCHEDULE}/edit/${currentSchedule.id}`);
            }}
          >
            수정
          </IconTextButton>
        </header>
        <section css={contentStyle}>
          <div>
            <span className='subtitle'>시작일</span>
            <p>
              <span>{formatOnlyDate(currentSchedule.startDate)}</span>
              <span>{formatTime(currentSchedule.startTime)}</span>
            </p>
          </div>
          <div>
            <span className='subtitle'>종료일</span>
            <p>
              <span>{formatOnlyDate(currentSchedule.endDate)}</span>
              <span>{formatTime(currentSchedule.endTime)}</span>
            </p>
          </div>
          <textarea css={textareaStyle} value={currentSchedule.content} readOnly></textarea>
          <Button styleType='text' customStyle={buttonStyle} onClick={handleDeleteClick}>
            일정 삭제하기
          </Button>
        </section>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
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
  padding-left: 12px;
  margin-bottom: 1rem;
`;
const titleStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h1 {
    margin-left: 0.5rem;
    font-size: ${theme.fontSizes.xlarge};
    font-weight: bold;
    color: ${theme.colors.darkestGray};
    flex-shrink: 1;
  }
`;

const circleStyle = (schedule: ScheduleModel) => css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${schedulePickerColors[schedule.color]};
  flex-shrink: 0;
`;

const contentStyle = css`
  > div {
    height: ${theme.heights.tall};
    padding: 0 12px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      display: flex;
      gap: 1rem;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: ${theme.heights.short};
        border-radius: 4px;
      }
    }
  }

  .subtitle {
    color: ${theme.colors.darkestGray};
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
  font-size: ${theme.fontSizes.large};
  -webkit-letter-spacing: -1px;
  letter-spacing: 0px;
  line-height: 1.5;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  margin: 8px 0 24px;
  padding: 12px;
  outline: none;
`;
const buttonStyle = css`
  background-color: ${theme.colors.bgGray};
`;

export default DailyScheduleDetail;
