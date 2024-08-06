import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import useToast from '@/hooks/useToast';
import { useAppDispatch } from '@/store/hooks';
import { deleteSchedule } from '@/store/reducer/scheduleSlice';
import { ScheduleModel } from '@/types/schedule';

const useScheduleDelete = (schedule: ScheduleModel) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toastTrigger } = useToast();

  // 일정 삭제 버튼 클릭
  const handleDeleteClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // 일정삭제 모달에서 일정 취소하기 버튼 클릭
  const handleConfirmDelete = useCallback(async () => {
    try {
      // TODO: 일정 삭제 API 호출
      const result = await dispatch(
        deleteSchedule({
          userNo: schedule.userNo,
          startDate: schedule.startDate,
          endDate: schedule.endDate,
        })
      ).unwrap(); // unwrap()은 비동기 함수의 반환값(Promise)을 반환a
      setIsModalOpen(false);

      // navigate해주기 전에 삭제되었다고 토스트ui 띄우기 코드 필요
      toastTrigger('일정이 삭제되었습니다.');
      navigate('/schedule');
    } catch (error) {
      console.error('Delete error:', error);
    }
  }, [dispatch, navigate, schedule]);

  // 일정삭제 모달에서 취소 버튼 클릭
  const handleCancelDelete = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
  };
};

export default useScheduleDelete;
