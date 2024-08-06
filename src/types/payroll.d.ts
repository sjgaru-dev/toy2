export interface CorrectionProps {
  id: number;
  salaryId: number;
  userNo: string | undefined;
  requestDate: string;
  status: string;
  type: string;
  subject: string;
  content: string;
  attach?: string;
  attachFile?: File;
}

export interface AttachProps {
  file: File;
  docId: string;
  data: CorrectionProps;
}
