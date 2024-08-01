/* eslint-disable no-console */
import React from 'react';

import { css } from '@emotion/react';
import { HiArrowLeft, HiDownload } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';

import Badge from '@/components/common/Badge';
import IconTextButton from '@/components/common/Buttons/IconTextButton';
import theme from '@/styles/theme';

const PayrollDetail: React.FC = () => {
  const navigate = useNavigate();
  const { year, month } = useParams<{ year: string; month: string }>();

  const payrollData = {
    totalAmount: 4570000,
    salary: 4000000,
    overtime: 570000,
    deductions: 582680,
    nationalPension: 178490,
    healthInsurance: 140610,
    longTermCare: 18210,
    employmentInsurance: 35690,
    incomeTax: 190620,
    localIncomeTax: 19060,
  };

  return (
    <div css={containerStyle}>
      <div css={cardStyle}>
        <div css={cardHeaderStyle}>
          <button onClick={() => navigate(-1)} css={backButtonStyle}>
            <HiArrowLeft />
          </button>
        </div>
        <div css={totalAmountStyle}>
          <span css={dateStyle}>
            {year}년 {month}월 급여명세서
          </span>
          <div css={amountContainer}>
            <span css={amountStyle}>{payrollData.totalAmount.toLocaleString()}원</span>
            <Badge label='실수령액' color={theme.colors.primary} />
          </div>
          <IconTextButton Icon={HiDownload} backgroundButton={true}>
            저장
          </IconTextButton>
        </div>
      </div>
      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>지급 총액</h2>
        <div css={itemStyle}>
          <span>기본급</span>
          <span>{payrollData.salary.toLocaleString()}원</span>
        </div>
        <div css={itemStyle}>
          <span>초과근무수당</span>
          <span>{payrollData.overtime.toLocaleString()}원</span>
        </div>
        <div css={totalStyle}>
          <span>합계</span>
          <span css={totalAmountColorStyle}>{payrollData.totalAmount.toLocaleString()}원</span>
        </div>
      </section>
      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>공제 총액</h2>
        <div css={itemStyle}>
          <span>국민연금</span>
          <span>{payrollData.nationalPension.toLocaleString()}원</span>
        </div>
        <div css={itemStyle}>
          <span>건강보험</span>
          <span>{payrollData.healthInsurance.toLocaleString()}원</span>
        </div>
        <div css={itemStyle}>
          <span>장기요양</span>
          <span>{payrollData.longTermCare.toLocaleString()}원</span>
        </div>
        <div css={itemStyle}>
          <span>고용보험</span>
          <span>{payrollData.employmentInsurance.toLocaleString()}원</span>
        </div>
        <div css={itemStyle}>
          <span>소득세</span>
          <span>{payrollData.incomeTax.toLocaleString()}원</span>
        </div>
        <div css={itemStyle}>
          <span>지방소득세</span>
          <span>{payrollData.localIncomeTax.toLocaleString()}원</span>
        </div>
        <div css={totalStyle}>
          <span>합계</span>
          <span css={deductionsTotalColorStyle}>{payrollData.deductions.toLocaleString()}원</span>
        </div>
      </section>
    </div>
  );
};

const containerStyle = css`
  background-color: ${theme.colors.bgGray};
`;

const backButtonStyle = css`
  background: none;
  border: none;
  font-size: 24px;
  color: ${theme.colors.darkestGray};
  cursor: pointer;
`;

const cardStyle = css`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const cardHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const totalAmountStyle = css`
  padding: 20px;
`;

const dateStyle = css`
  display: block;
  margin-bottom: 8px;
`;

const amountContainer = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const amountStyle = css`
  font-size: ${theme.fontSizes.xxlarge};
  font-weight: bold;
`;

const sectionStyle = css`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const sectionTitleStyle = css`
  font-size: ${theme.fontSizes.large};
  font-weight: bold;
  margin-bottom: 16px;
`;

const itemStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const totalStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${theme.colors.lightestGray};
  font-weight: bold;
`;

const totalAmountColorStyle = css`
  color: ${theme.colors.primary};
`;

const deductionsTotalColorStyle = css`
  color: ${theme.colors.paleOrange};
`;

export default PayrollDetail;
