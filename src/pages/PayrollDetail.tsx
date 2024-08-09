import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import html2canvas from 'html2canvas';
import { HiDownload } from 'react-icons/hi';
import { useParams, useNavigate } from 'react-router-dom';

import { getSalarys } from '@/api/payroll';
import Badge from '@/components/common/Badge';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Header from '@/components/layout/Header';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';
import { PayrollData, SalaryType } from '@/types/payroll';

const INIT_PAYROLL_DATA: PayrollData = {
  receive: 0,
  salary: {
    total: 0,
    base: 0,
    overtime: 0,
  },
  tax: {
    nationalPension: 0,
    healthInsurance: 0,
    longTermCare: 0,
    employmentInsurance: 0,
    incomeTax: 0,
    localIncomeTax: 0,
    total: 0,
  },
};

const PayrollDetail = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const navigate = useNavigate();
  const payrollContainerRef = useRef<HTMLDivElement>(null);
  const downloadButtonRef = useRef<HTMLDivElement>(null);

  const [payrollData, setPayrollData] = useState<PayrollData>(INIT_PAYROLL_DATA);

  useEffect(() => {
    let receiveData = localStorage.getItem('currentDeatilSalary');

    if (receiveData) setPayrollData(JSON.parse(receiveData));
    else {
      (async () => {
        const { response } = await getSalarys();
        const currentSalary: SalaryType[] = response.filter((item) => {
          const paydate: string = item.payday.substring(0, 7);
          if (paydate === `${year}-${month}`) return item as SalaryType;
        });

        if (currentSalary.length > 0) {
          receiveData = JSON.stringify(currentSalary[0].receiveData);
          localStorage.setItem('currentDeatilSalary', receiveData);
          setPayrollData(JSON.parse(receiveData));
        }
      })();
    }
  }, []);

  const handleDownload = async () => {
    const element = payrollContainerRef.current;
    const downloadButton = downloadButtonRef.current;
    if (element && downloadButton) {
      downloadButton.style.display = 'none';

      const canvas = await html2canvas(element, {
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      });

      downloadButton.style.display = 'block';

      const imgData = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${year}년 ${month}월 급여명세서.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleGoBack = () => {
    navigate(PATH.SALARY, { state: { activeTab: 0 } });
  };

  return (
    <>
      <Header onBack={handleGoBack} />
      <div ref={payrollContainerRef}>
        <div css={headerStyle}>
          <div css={headerTitleSectionStyle}>
            <span css={headerTitleStyle}>
              {year}년 {month}월 급여명세서
            </span>
          </div>
          <div css={totalAmountSectionStyle}>
            <span css={totalAmountStyle}>{payrollData.receive.toLocaleString()}원</span>
            <Badge label='실수령액' color={theme.colors.paleOrange} />
            <div css={downloadButtonStyle} ref={downloadButtonRef}>
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
              <span css={totalAmountColorStyle}>{payrollData.salary.total.toLocaleString()}원</span>
            </h2>
            <div css={itemStyle}>
              <span>기본급</span>
              <span>{payrollData.salary.base.toLocaleString()}원</span>
            </div>
            <div css={itemStyle}>
              <span>초과근무수당</span>
              <span>{payrollData.salary.overtime.toLocaleString()}원</span>
            </div>
          </section>
        </div>
        <div css={deductionStyle} className='wrapper'>
          <section css={[sectionStyle, lastSectionStyle]}>
            <h2 css={sectionTitleStyle}>
              공제 총액
              <span css={deductionsTotalColorStyle}>
                {payrollData.tax.total.toLocaleString()}원
              </span>
            </h2>
            <div css={itemStyle}>
              <span>국민연금</span>
              <span>{payrollData.tax.nationalPension.toLocaleString()}원</span>
            </div>
            <div css={itemStyle}>
              <span>건강보험</span>
              <span>{payrollData.tax.healthInsurance.toLocaleString()}원</span>
            </div>
            <div css={itemStyle}>
              <span>장기요양</span>
              <span>{payrollData.tax.longTermCare.toLocaleString()}원</span>
            </div>
            <div css={itemStyle}>
              <span>고용보험</span>
              <span>{payrollData.tax.employmentInsurance.toLocaleString()}원</span>
            </div>
            <div css={itemStyle}>
              <span>소득세</span>
              <span>{payrollData.tax.incomeTax.toLocaleString()}원</span>
            </div>
            <div css={itemStyle}>
              <span>지방소득세</span>
              <span>{payrollData.tax.localIncomeTax.toLocaleString()}원</span>
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
  margin-bottom: 1.5rem;

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
