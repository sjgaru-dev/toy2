import { css } from '@emotion/react';

import UserDefaultImage from '@/assets/images/user_default.svg';
import Badge from '@/components/common/Badge';
import theme from '@/styles/theme';
import { UpcomingProps } from '@/types/props';

const COMPONENT_INFO = {
  title: '동료 이벤트',
  noEvent: '이벤트가 없습니다.',
};

const UpcomingSchedules = ({ upcomingData }: UpcomingProps) => (
  <section className='wrapper'>
    <h2 css={titleStyle}>{COMPONENT_INFO.title}</h2>
    <ul css={upcomingStyle}>
      {upcomingData && upcomingData.length > 0 ? (
        <>
          {upcomingData.map((item, index) => (
            <li key={index} css={upcomingItemStyle}>
              <div css={upcomingDataStyle}>
                <div css={imgDivStyle}>
                  <img src={item.img ? item.img : UserDefaultImage} css={imgStyle} />
                </div>
                <div css={[textWrapStyle, nameStyle]}>{item.name}</div>
                <div css={[textWrapStyle, eventStyle]}>{item.event}</div>
              </div>
              <Badge label={item.badge.text} color={item.badge.color} />
            </li>
          ))}
        </>
      ) : (
        <li>{COMPONENT_INFO.noEvent}</li>
      )}
    </ul>
  </section>
);

const titleStyle = css`
  margin: 2rem 0 0.75rem;
  font-size: ${theme.fontSizes.large};
  font-weight: bold;
`;

const upcomingStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
  border-radius: 0.5rem;
  font-size: ${theme.fontSizes.normal};
  background-color: ${theme.colors.white};
`;

const upcomingItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const upcomingDataStyle = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const imgDivStyle = css`
  width: 36px;
  height: 36px;
  border: 1px solid ${theme.colors.borderLightGray};
  border-radius: 4px;
  overflow: hidden;
`;

const imgStyle = css`
  width: 100%;
`;

const textWrapStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const nameStyle = css`
  margin-left: 4px;
`;

const eventStyle = css`
  color: ${theme.colors.darkGray};
`;

export default UpcomingSchedules;
