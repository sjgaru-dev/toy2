import { css } from '@emotion/react';

import UserDefaultImage from '@/assets/image/userDefault';
import Badge from '@/components/common/Badge';
import theme from '@/styles/theme';
import { UpcomingProps } from '@/types/props';

const COMPONENT_INFO = {
  title: '동료 이벤트',
};

const UpcomingSchdules = ({ upcomingData }: UpcomingProps) => (
  <>
    {upcomingData && upcomingData.length > 0 ? (
      <>
        <h1 css={upcomingTitleStyle}>{COMPONENT_INFO.title}</h1>
        <div css={upcomingStyle}>
          {upcomingData.map((item, index) => (
            <div key={index} css={upcomingItemStyle}>
              <div css={imgStyle}>
                <UserDefaultImage size='3rem' />
              </div>
              <div css={[textWrapStyle, nameStyle]}>{item.name}</div>
              <div css={[textWrapStyle, eventStyle]}>{item.event}</div>
              <div css={badgeDiv}>
                <Badge label={item.badge.text} color={item.badge.color} />
              </div>
            </div>
          ))}
        </div>
      </>
    ) : (
      <></>
    )}
  </>
);
const upcomingTitleStyle = css`
  margin: 1rem;
  font-size: ${theme.fontSizes.xlarge};
`;

const upcomingStyle = css`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  font-size: ${theme.fontSizes.normal};
  border: 1px solid ${theme.colors.borderLightGray};
  border-radius: 1rem;

  & div {
    justify-content: center;
    align-items: center;
  }
`;

const imgStyle = css`
  border: 1px solid ${theme.colors.borderLightGray};
  border-radius: 1rem;
`;

const textWrapStyle = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &.name {
    width: 10rem;
  }
  &.subject {
    width: 100%;
    color: ${theme.colors.darkGray};
  }
`;

const nameStyle = css`
  width: 10rem;
`;

const eventStyle = css`
  width: 100%;
  color: ${theme.colors.darkGray};
`;

const badgeDiv = css`
  width: 10rem;
`;

const upcomingItemStyle = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  margin: 0.5rem;
`;

export default UpcomingSchdules;
