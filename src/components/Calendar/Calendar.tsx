/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { Calendar as BigCalendar, DateLocalizer, dayjsLocalizer } from 'react-big-calendar';
import 'dayjs/locale/ko';

import CalendarToolbar from '@/components/Calendar/CalendarToolbar';
import DateCellWrapper from '@/components/Calendar/DateCellWrapper';
import theme from '@/styles/theme';
import { DateCellProps, EventModel, ToolbarProps } from '@/types/calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

dayjs.locale('ko');
const localizer = dayjsLocalizer(dayjs);

interface CalendarProps {
  schedule: EventModel[];
  activeDate: Date;
  setActiveDate: (date: Date) => void;
}

const Calendar = ({ schedule, activeDate, setActiveDate }: CalendarProps) => {
  const Toolbar = ({ date, onNavigate }: ToolbarProps) => (
    <CalendarToolbar setActiveDate={setActiveDate} date={date} onNavigate={onNavigate} />
  );

  const CellWrapper = ({ value }: DateCellProps) => (
    <DateCellWrapper value={value} activeDate={activeDate} setActiveDate={setActiveDate} />
  );

  const eventPropGetter = (event: EventModel) => {
    const color = event.color || theme.colors.paleGreen;
    const backgroundColor = color + '1a';
    return { style: { color, backgroundColor } };
  };

  return (
    <div>
      <BigCalendar
        css={calendarStyle}
        localizer={localizer as DateLocalizer}
        events={schedule}
        startAccessor='start'
        endAccessor='end'
        components={{
          toolbar: Toolbar,
          dateCellWrapper: CellWrapper,
        }}
        views={{ month: true }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

const calendarStyle = css`
  height: 500px;

  .rbc-month-view,
  .rbc-header {
    border: 0;
  }

  .rbc-month-header {
    padding-bottom: 4px;
  }

  .rbc-header {
    font-weight: 400;
    color: ${theme.colors.darkestGray};
    font-size: ${theme.fontSizes.small};
  }

  .rbc-off-range-bg {
    background-color: ${theme.colors.bgGray};
  }

  .rbc-row-content {
    z-index: initial;
  }

  .rbc-date-cell {
    text-align: center;
    padding-right: 0;

    button {
      font-size: ${theme.fontSizes.small};
    }
  }

  .rbc-month-row + .rbc-month-row {
    border-top: 1px solid ${theme.colors.borderLightGray};
  }

  .rbc-day-bg + .rbc-day-bg {
    border: 0;
  }

  .rbc-button-link {
    z-index: 20;
    position: relative;
    margin-bottom: 4px;
    user-select: none;
  }

  .rbc-event {
    border-radius: 2px;
    font-size: ${theme.fontSizes.small};
    cursor: default;
  }

  .rbc-today {
    background-color: transparent;
  }

  .rbc-show-more {
    width: 16px;
    padding-top: 2px;
    margin: 0 auto;
    font-size: ${theme.fontSizes.small};
    font-weight: 500;
    color: ${theme.colors.darkGray};
    text-overflow: clip;
    cursor: default;
  }
`;

export default Calendar;
