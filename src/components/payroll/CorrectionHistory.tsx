import React from 'react';

import { css } from '@emotion/react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { LiaQuestionCircle } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';

import Badge from '@/components/common/Badge';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

interface CorrectionItem {
  id: string;
  date: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
}

const CorrectionHistory: React.FC = () => {
  const navigate = useNavigate();
  const correctionItems: CorrectionItem[] = [
    {
      id: '1',
      date: '2024-06-14',
      content: '무급 휴가 안 썼어요',
      status: 'pending',
    },
    {
      id: '2',
      date: '2024-06-14',
      content: '무급 휴가 안 썼어요',
      status: 'approved',
    },
    {
      id: '3',
      date: '2024-06-14',
      content: '간식비 또 주세요',
      status: 'rejected',
    },
    { id: '4', date: '2024-06-14', content: '간식비 제발', status: 'approved' },
    {
      id: '5',
      date: '2024-06-14',
      content: '무급 휴가 안 썼어요',
      status: 'approved',
    },
  ];

  const handleViewDetails = (id: string) => {
    navigate(`${PATH.SALARY_CORRECTION_DETAIL.replace(':id', id)}`);
  };

  return (
    <div css={containerStyle} className='wrapper'>
      <h2 css={titleStyle}>
        정정 신청 내역
        <Popover css={popoverStyle}>
          <PopoverButton css={popoverButtonStyle}>
            <LiaQuestionCircle />
          </PopoverButton>
          <PopoverPanel css={popoverPanelStyle}>
            <p>신청 내역을 누르면 신청 상세 내역으로 이동합니다.</p>
          </PopoverPanel>
        </Popover>
      </h2>
      <div css={listStyle}>
        {correctionItems.map((item) => (
          <div key={item.id} css={itemStyle} onClick={() => handleViewDetails(item.id)}>
            <div css={cardStyle}>
              <div css={contentWrapper}>
                <div css={dateStyle}>{item.date}</div>
                <div css={contentStyle}>{item.content}</div>
              </div>
              <div css={actionWrapper}>
                <div css={badgeWrapper}>
                  <Badge label={getStatusLabel(item.status)} color={getStatusColor(item.status)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending':
      return '대기';
    case 'approved':
      return '승인';
    case 'rejected':
      return '반려';
    default:
      return '';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return theme.colors.darkGray;
    case 'approved':
      return theme.colors.primary;
    case 'rejected':
      return theme.colors.alertRed;
    default:
      return '';
  }
};

const containerStyle = css`
  background-color: ${theme.colors.white};
  padding: 16px;
`;

const titleStyle = css`
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
  padding-top: 16px;
  margin-bottom: 32px;
  color: ${theme.colors.black};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const popoverStyle = css`
  position: relative;
`;

const popoverButtonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${theme.fontSizes.xxlarge};
  color: ${theme.colors.darkGray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const popoverPanelStyle = css`
  position: absolute;
  z-index: 10;
  background-color: ${theme.colors.darkGray};
  border-radius: 8px;
  padding: 12px;
  width: 300px;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
  font-weight: 300;
  margin-top: 4px;
`;

const listStyle = css`
  display: grid;
  gap: 16px;
`;

const itemStyle = css`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${theme.colors.lightGray};
  cursor: pointer;
`;

const cardStyle = css`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const contentWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const dateStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkGray};
  margin-bottom: 8px;
`;

const contentStyle = css`
  font-size: ${theme.fontSizes.xlarge};
  font-weight: 500;
  color: ${theme.colors.darkestGray};
`;

const actionWrapper = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const badgeWrapper = css`
  span {
    padding: 8px 16px;
    font-size: ${theme.fontSizes.normal};
  }
`;

export default CorrectionHistory;
