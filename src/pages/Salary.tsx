import { css } from '@emotion/react';

import Tabs from '@/components/common/Tabs';
import PayrollNotice from '@/components/dashboard/PayrollNotice';
import PayrollList from '@/components/payroll/PayrollList';
import theme from '@/styles/theme';

const SalaryPage = () => (
  <div>
    <h1 className='page-title'>급여</h1>
    <Tabs tabs={['급여명세서', '정정 내역', '정정 신청']}>
      <div>
        <PayrollNotice />
        <PayrollList />
      </div>
      <div css={tabContentsStyle}>정정 내역 내용</div>
      <div css={tabContentsStyle}>정정 신청 내용</div>
    </Tabs>
  </div>
);

const tabContentsStyle = css`
  margin-top: 12px;
  background-color: ${theme.colors.white};
`;

export default SalaryPage;
