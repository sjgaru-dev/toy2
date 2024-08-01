/* eslint-disable no-unused-vars */
type NavigateType = 'PREV' | 'NEXT' | 'TODAY' | 'DATE';

export interface EventModel {
  id?: number;
  start: Date;
  end: Date;
  title: string;
  color?: string;
}

export interface ToolbarProps {
  date: Date;
  onNavigate: (action: NavigateType) => void;
}

export interface DateCellProps {
  value: Date;
}
