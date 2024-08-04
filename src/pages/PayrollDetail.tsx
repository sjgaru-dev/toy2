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
      <Header />
      <div id='payroll-container'>
        <div css={headerStyle}>
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
          <section css={[sectionStyle, lastSectionStyle]}>
            <h2 css={sectionTitleStyle}>
              공제 총액
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

const headerStyle = css`
  background-color: ${theme.colors.white};
  padding: 20px 16px;
`;

const totalAmountSectionStyle = css`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-top: 8px;
`;

const totalAmountStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${theme.colors.black};
  margin-right: 8px;
`;

const paymentStyle = css`
  background-color: ${theme.colors.white};
  margin: 12px 0;
`;

const deductionStyle = css`
  background-color: ${theme.colors.white};
`;

const headerTitleSectionStyle = css`
  display: flex;
  align-items: center;
`;

const headerTitleStyle = css`
  font-size: ${theme.fontSizes.large};
  font-weight: bold;
  color: ${theme.colors.darkGray};
`;

const downloadButtonStyle = css`
  margin-left: auto;
`;

const sectionStyle = css`
  padding: 2rem 0;
`;

const sectionTitleStyle = css`
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
  color: ${theme.colors.black};
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;

const itemStyle = css`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkGray};
  margin-bottom: 1.2rem;

  &:last-child {
    margin-bottom: 0;
  }

  span:last-child {
    color: ${theme.colors.darkestGray};
  }
`;

const totalAmountColorStyle = css`
  color: ${theme.colors.primary};
`;

const deductionsTotalColorStyle = css`
  color: ${theme.colors.paleOrange};
`;

const lastSectionStyle = css`
  padding-bottom: 112px;
`;

export default PayrollDetail;
