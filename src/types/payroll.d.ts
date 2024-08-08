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
  attachFile?: File[];
}

export interface AttachProps {
  file: File;
  docId: string;
  data: CorrectionProps;
}

export interface SalaryType {
  id: number;
  userNo: string;
  type: string;
  paycheck: number;
  payday: string;
  isCheck: boolean;
  receiveData?: PayrollData;
}

export interface PayrollData {
  receive: number;
  salary: {
    total: number;
    base: number;
    overtime: number;
  };
  tax: {
    nationalPension: number;
    healthInsurance: number;
    longTermCare: number;
    employmentInsurance: number;
    incomeTax: number;
    localIncomeTax: number;
    total: number;
  };
}
