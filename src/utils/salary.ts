import { TAX } from '@/constants/salary';
import { PayrollData } from '@/types/payroll';

export const calcTax = (salary: number): PayrollData => {
  const overtime = 200000;

  const deductions = Object.entries(TAX).reduce(
    (acc, [key, rate]) => {
      if (key === 'total') return acc;
      const deduction = Math.floor(salary * rate);
      acc = { ...acc, [key]: deduction };
      acc.total += deduction;
      return acc;
    },
    {
      nationalPension: 0,
      healthInsurance: 0,
      longTermCare: 0,
      employmentInsurance: 0,
      incomeTax: 0,
      localIncomeTax: 0,
      total: 0,
    }
  );

  return {
    receive: salary + overtime - deductions.total,
    salary: {
      total: salary + overtime,
      base: salary,
      overtime,
    },
    tax: deductions,
  };
};
