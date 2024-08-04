import { css } from '@emotion/react';
import html2canvas from 'html2canvas';
import { HiDownload } from 'react-icons/hi';
import { useParams } from 'react-router-dom';

import Badge from '@/components/common/Badge';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Header from '@/components/layout/Header';
import theme from '@/styles/theme';

const PayrollDetail = () => {
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

  const handleDownload = async () => {
    const element = document.getElementById('payroll-container');
    if (element) {
      const canvas = await html2canvas(element, {
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      });
      const imgData = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${year}년 ${month}월 급여명세서.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div css={topStyle}>
        <Header />
      </div>
      <div id='payroll-container' css={payrollContainerStyle}>
        <div css={headerStyle} className='wrapper'>
          <div css={headerTitleSectionStyle}>
            <span css={headerTitleStyle}>
              {year}년 {month}월 급여명세서
            </span>
          </div>
          <div css={totalAmountSectionStyle}>
            <span css={totalAmountStyle}>{payrollData.totalAmount.toLocaleString()}원</span>
            <Badge label='실수령액' color={theme.colors.paleOrange} />
            <div css={downloadButtonStyle}>
              <IconTextButton Icon={HiDownload} backgroundButton={false} onClick={handleDownload}>
                저장
              </IconTextButton>
            </div>
          </div>
        </div>
        <div css={paymentStyle} className='wrapper'>
          <section css={sectionStyle}>
            <h2 css={sectionTitleStyle}>
              지급 총액{' '}
              <span css={totalAmountColorStyle}>{payrollData.totalAmount.toLocaleString()}원</span>
            </h2>
            <div css={itemStyle}>
              <span>기본급</span>
              <span>{payrollData.salary.toLocaleString()}원</span>
            </div>
            <div css={itemStyle}>
              <span>초과근무수당</span>
              <span>{payrollData.overtime.toLocaleString()}원</span>
            </div>
          </section>
        </div>
        <div css={deductionStyle} className='wrapper'>
          <section css={sectionStyle}>
            <h2 css={sectionTitleStyle}>
              공제 총액{' '}
              <span css={deductionsTotalColorStyle}>
                {payrollData.deductions.toLocaleString()}원
              </span>
            </h2>
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
          </section>
        </div>
      </div>
    </>
  );
};

const topStyle = css`
  background-color: ${theme.colors.white};
  padding-top: 16px;
`;

const headerStyle = css`
  background-color: ${theme.colors.white};
  margin-bottom: 16px;
  height: 100px;
`;

const paymentStyle = css`
  background-color: ${theme.colors.white};
  margin-bottom: 16px;
  height: 250px;
`;

const deductionStyle = css`
  background-color: ${theme.colors.white};
  height: 408px;
`;

const headerTitleSectionStyle = css`
  display: flex;
  align-items: center;
`;

const headerTitleStyle = css`
  font-size: ${theme.fontSizes.large};
  font-weight: bold;
  color: ${theme.colors.darkGray};
  margin-top: 16px;
`;

const totalAmountSectionStyle = css`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 8px 0;
`;

const totalAmountStyle = css`
  font-size: ${theme.fontSizes.xxlarge};
  font-weight: bold;
  color: ${theme.colors.black};
  margin-right: 16px;
`;

const downloadButtonStyle = css`
  margin-left: auto;
`;

const sectionStyle = css`
  padding: 24px 0;
  border-bottom: 1px solid ${theme.colors.lightestGray};
  &:last-of-type {
    border-bottom: none;
  }
`;

const sectionTitleStyle = css`
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
  color: ${theme.colors.black};
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.lightestGray};
  padding-bottom: 16px;
`;

const itemStyle = css`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.darkGray};
  margin-bottom: 32px;
`;

const totalAmountColorStyle = css`
  color: ${theme.colors.primary};
`;

const deductionsTotalColorStyle = css`
  color: ${theme.colors.paleOrange};
`;

const payrollContainerStyle = css`
  background-color: ${theme.colors.lightestGray};
  padding-bottom: 16px;
`;

export default PayrollDetail;
