import { PayrollData } from '@/types/payroll';

export const TAX: PayrollData['tax'] = {
  nationalPension: 0.045,
  healthInsurance: 0.03545,
  longTermCare: 0.03545 * 0.1295,
  employmentInsurance: 0.09,
  incomeTax: 0.05,
  localIncomeTax: 0.05 * 0.1,
  total: 1,
};
