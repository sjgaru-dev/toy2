import React, { useState, useMemo, useEffect } from 'react';

import { css } from '@emotion/react';
import { HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import moneyImage from '@/assets/images/money.png';
import Button from '@/components/common/buttons/Button';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

const PayrollNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const { year, month } = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (currentMonth === 1) {
      return { year: currentYear - 1, month: '12' };
    } else {
      const prevMonth = currentMonth - 1;
      return {
        year: currentYear,
        month: prevMonth.toString().padStart(2, '0'),
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('payrollNoticeChecked');
    });

    const checked = localStorage.getItem('payrollNoticeChecked');
    const lastNoticeMonth = localStorage.getItem('lastNoticeMonth');
    const currentNoticeMonth = `${year}-${month}`;

    if (lastNoticeMonth !== currentNoticeMonth) {
      localStorage.setItem('lastNoticeMonth', currentNoticeMonth);
      localStorage.removeItem('payrollNoticeChecked');
      setIsVisible(true);
    } else if (checked) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener('beforeunload', () => {
        localStorage.removeItem('payrollNoticeChecked');
      });
    };
  }, [year, month]);

  const handleButtonClick = () => {
    localStorage.setItem('payrollNoticeChecked', 'true');
    navigate(
      `${PATH.SALARY}/${PATH.SALARY_DETAIL.replace(':year', year.toString()).replace(':month', month)}`
    );
  };

  const handleCloseClick = () => {
    localStorage.setItem('payrollNoticeChecked', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div css={cardContainerStyle}>
      <button css={closeButtonStyle} onClick={handleCloseClick}>
        <HiX css={closeIconStyle} />
      </button>
      <h3 css={titleStyle}>
        {year}년 {month}월
        <br /> 급여명세서가 도착했습니다!
      </h3>
      <img src={moneyImage} alt='돈뭉치' css={imageStyle} />
      <Button onClick={handleButtonClick}>조회하기</Button>
    </div>
  );
};

const cardContainerStyle = css`
  position: relative;
  padding: 24px 20px 20px;
  margin: ${theme.fontSizes.small} 1rem;
  border: 1px solid ${theme.colors.borderLightGray};
  border-radius: 8px;
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
  text-align: left;
  background-color: ${theme.colors.white};
`;

const closeButtonStyle = css`
  position: absolute;
  right: 16px;
  border: none;
  background: none;
  cursor: pointer;
`;

const titleStyle = css`
  font-size: ${theme.fontSizes.xxlarge};
  font-weight: 700;
  line-height: 1.4;
`;

const imageStyle = css`
  display: block;
  width: 120px;
  margin: 0 auto 0.5rem;
`;

const closeIconStyle = css`
  width: 20px;
  height: 20px;
  color: ${theme.colors.darkGray};
`;

export default PayrollNotice;
