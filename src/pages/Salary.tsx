import { css } from '@emotion/react';

import SalaryCard from '@/components/common/SalaryCard';
import Tabs from '@/components/common/Tabs';
import theme from '@/styles/theme';

const headerStyle = css`
  font-weight: 700;
  margin: 1rem 0 0 1rem;
  font-size: ${theme.fontSizes.xxlarge};
  color: ${theme.colors.black};
`;

const SalaryPage = () => (
  <div>
    <h1 css={headerStyle}>급여</h1>
    <Tabs tabs={['급여명세서', '정정 내역', '정정 신청']}>
      <div>
        <SalaryCard /> {}
      </div>
      <div>정정 내역 내용</div>
      <div>정정 신청 내용</div>
    </Tabs>
  </div>
);

export default SalaryPage;
