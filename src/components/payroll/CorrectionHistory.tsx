import React from 'react';

import { css } from '@emotion/react';
import { HiChevronRight } from 'react-icons/hi';
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
      <h2 css={titleStyle}>신청 현황</h2>
      <ul css={listStyle}>
        {correctionItems.map((item) => (
          <li key={item.id} onClick={() => handleViewDetails(item.id)}>
            <div className='contents-wrapper'>
              <div>
                <div className='contents-title'>{item.content}</div>
                <div className='contents-date'>{item.date}</div>
              </div>
              <div className='badge-container'>
                <Badge label={getStatusLabel(item.status)} color={getStatusColor(item.status)} />
              </div>
            </div>
            <HiChevronRight css={arrowStyle} />
          </li>
        ))}
      </ul>
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
  height: calc(100vh - 120px);
`;

const titleStyle = css`
  font-size: ${theme.fontSizes.large};
  font-weight: bold;
  padding: 32px 0 12px;
  color: ${theme.colors.black};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const listStyle = css`
  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    background-color: ${theme.colors.white};
    cursor: pointer;
  }

  .contents-wrapper {
    display: flex;
    gap: 0.5rem;
  }


const dateStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkGray};
  margin-bottom: 8px;

  .contents-title {
    font-weight: bold;
    margin: 2px 0 0.5rem;
    color: ${theme.colors.darkestGray};
  }


  .contents-date {
    font-size: ${theme.fontSizes.normal};
    color: ${theme.colors.darkGray};
  }

  .badge-container {
    height: 100%;
  }
`;

const arrowStyle = css`
  margin-bottom: 2px;
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.xxlarge};
`;

export default CorrectionHistory;
