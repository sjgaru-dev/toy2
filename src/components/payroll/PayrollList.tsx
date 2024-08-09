import React, { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { HiChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { getSalarys } from '@/api/payroll';
import theme from '@/styles/theme';
import { PayrollData, SalaryType } from '@/types/payroll';

interface PayrollItem {
  year: string;
  month: string;
  amount: number;
  date: string;
  receiveData: PayrollData;
}

const PayrollList: React.FC = () => {
  const navigate = useNavigate();

  const [payrollItems, setPayrollItems] = useState<PayrollItem[]>([]);

  useEffect(() => {
    (async () => {
      const salaryList = await getSalarys();
      setPayrollItems([...salaryToPayroll(salaryList.response)]);
    })();
  }, []);

  const salaryToPayroll = (salaryList: SalaryType[]): PayrollItem[] =>
    salaryList.map((item) => {
      const paydate = item.payday.split(' ')[0];
      return {
        year: paydate.substring(0, 4),
        month: paydate.substring(5, 7),
        amount: item.receiveData?.receive || 0,
        date: paydate.substring(5, 10) + ' 지급',
        receiveData: item.receiveData,
      } as PayrollItem;
    });

  const handleItemClick = (year: string, month: string, receiveData: PayrollData) => {
    localStorage.setItem('currentDeatilSalary', JSON.stringify(receiveData));
    navigate(`/salary/detail/${year}/${month}`);
  };

  return (
    <div css={containerStyle} className='wrapper'>
      {payrollItems.map((item, index) => (
        <React.Fragment key={`${item.year}-${item.month}`}>
          {index === 0 || payrollItems[index - 1].year !== item.year ? (
            <h2 css={yearHeaderStyle}>{item.year}년</h2>
          ) : null}
          <div
            css={itemStyle}
            onClick={() => handleItemClick(item.year, item.month, item.receiveData)}
          >
            <div css={leftContentStyle}>
              <span css={monthStyle}>{item.month}월 급여 명세서</span>
              <span css={dateStyle}>{item.date}</span>
            </div>
            <div css={rightContentStyle}>
              <span css={amountStyle}>{item.amount.toLocaleString()}원</span>
              <HiChevronRight css={arrowStyle} />
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const containerStyle = css`
  padding-bottom: 96px;
  margin-top: 12px;
  background-color: ${theme.colors.white};
`;

const yearHeaderStyle = css`
  font-size: ${theme.fontSizes.large};
  font-weight: bold;
  padding: 32px 0 12px;
  color: ${theme.colors.darkGray};
`;

const itemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const leftContentStyle = css`
  display: flex;
  flex-direction: column;
`;

const monthStyle = css`
  font-size: ${theme.fontSizes.large};
  font-weight: bold;
  color: ${theme.colors.darkestGray};
  margin-bottom: 0.25rem;
`;

const dateStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkGray};
  margin-top: 0.25rem;
`;

const rightContentStyle = css`
  display: flex;
  align-items: center;
`;

const amountStyle = css`
  font-size: ${theme.fontSizes.large};
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-right: 4px;
`;

const arrowStyle = css`
  margin-bottom: 2px;
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.xxlarge};
`;

export default PayrollList;
