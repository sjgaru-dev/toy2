import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';

import Tabs from '@/components/common/Tabs';
import PayrollNotice from '@/components/dashboard/PayrollNotice';
import CorrectionForm from '@/components/payroll/CorrectionForm';
import CorrectionHistory from '@/components/payroll/CorrectionHistory';
import PayrollList from '@/components/payroll/PayrollList';
import theme from '@/styles/theme';

const SalaryPage = () => {
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    if (location.state && typeof location.state.activeTab === 'number') {
      setActiveTabIndex(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div>
      <h1 className='page-title'>급여</h1>
      <Tabs
        tabs={['급여명세서', '정정 신청 내역', '정정 신청']}
        activeTab={activeTabIndex}
        onTabChange={setActiveTabIndex}
      >
        <div>
          <PayrollNotice />
          <PayrollList />
        </div>
        <div css={tabContentsStyle}>
          <CorrectionHistory />
        </div>
        <div css={tabContentsStyle}>
          <CorrectionForm />
        </div>
      </Tabs>
    </div>
  );
};

const tabContentsStyle = css`
  margin-top: 12px;
  background-color: ${theme.colors.white};
`;

export default SalaryPage;
