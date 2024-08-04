import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSchedule, ScheduleState } from '@/store/reducer/scheduleSlice';
import { EventModel } from '@/types/calendar';
import { getEventList } from '@/utils/schedule';

const useFetchSchedule = () => {
  const [events, setEvents] = useState<EventModel[]>([]);

  const dispatch = useAppDispatch();
  const { schedule, status, error } = useAppSelector(
    (state: { schedule: ScheduleState }) => state.schedule
  );

  useEffect(() => {
    dispatch(fetchSchedule());
  }, [dispatch]);

  useEffect(() => {
    if (schedule.length > 0) {
      const updatedEvents = getEventList(schedule);
      setEvents(updatedEvents);
    }
  }, [schedule]);

  return { schedule, events, status, error };
};

export default useFetchSchedule;
