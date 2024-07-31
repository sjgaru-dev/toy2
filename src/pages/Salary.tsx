import { css } from '@emotion/react';

import Tabs from '@/components/common/Tabs';
import theme from '@/styles/theme';

const headerStyle = css`
  font-weight: 700;
  margin: 40px 0 0 40px;
  font-size: ${theme.fontSizes.xxlarge};
  color: ${theme.colors.black};
`;

const SalaryPage = () => (
  <div>
    <h1 css={headerStyle}>급여</h1>
    <Tabs tabs={['급여명세서', '정정 내역', '정정 신청']}>
      <div>급여명세서 내용</div>
      <div>정정 내역 내용</div>
      <div>정정 신청 내용</div>
    </Tabs>
  </div>
);

export default SalaryPage;
