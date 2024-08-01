import { css } from '@emotion/react';

import Tabs from '@/components/common/Tabs';
import PayrollList from '@/components/dashboard/PayrollList';
import PayrollNotice from '@/components/dashboard/PayrollNotice';
import theme from '@/styles/theme';

const SalaryPage = () => (
  <div css={pageContainerStyle}>
    <h1 css={headerStyle}>급여</h1>
    <Tabs tabs={['급여명세서', '정정 내역', '정정 신청']}>
      <div>
        <PayrollNotice />
        <PayrollList />
      </div>
      <div>정정 내역 내용</div>
      <div>정정 신청 내용</div>
    </Tabs>
  </div>
);

const pageContainerStyle = css`
  padding-bottom: 100px;
`;

const headerStyle = css`
  font-weight: 700;
  margin: 1rem 0 0 2rem;
  padding: 0.5rem 0;
  font-size: ${theme.fontSizes.xxlarge};
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
`;

export default SalaryPage;
