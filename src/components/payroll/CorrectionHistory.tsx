import React, { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { HiChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { db } from '@/api';
import Badge from '@/components/common/Badge';
import { FIRESTORE_COLLECTION } from '@/constants/api';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

interface CorrectionItem {
  id: string;
  requestDate: string;
  subject: string;
  status: string;
  type: string;
}

const CorrectionHistory: React.FC = () => {
  const navigate = useNavigate();
  const [correctionItems, setCorrectionItems] = useState<CorrectionItem[]>([]);

  useEffect(() => {
    const fetchCorrectionHistory = async () => {
      const q = query(
        collection(db, FIRESTORE_COLLECTION.salaryRequest),
        orderBy('requestDate', 'desc'),
        orderBy('id', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const history = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          requestDate:
            data.requestDate instanceof Timestamp ? formatDate(data.requestDate) : data.requestDate,
          subject: data.subject,
          status: data.status,
          type: data.type,
        };
      });
      setCorrectionItems(history);
    };

    fetchCorrectionHistory();
  }, []);

  const formatDate = (timestamp: Timestamp) => {
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
    return '';
  };

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
                <div className='contents-title'>{item.subject}</div>
                <div className='contents-date'>{item.requestDate}</div>
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
    case '대기':
      return '대기';
    case '승인':
      return '승인';
    case '반려':
      return '반려';
    default:
      return '';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case '대기':
      return theme.colors.darkGray;
    case '승인':
      return theme.colors.primary;
    case '반려':
      return theme.colors.alertRed;
    default:
      return theme.colors.darkGray;
  }
};

const containerStyle = css`
  background-color: ${theme.colors.white};
  padding-bottom: 80px;
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
