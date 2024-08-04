import React from 'react';

import { css } from '@emotion/react';
import { Disclosure } from '@headlessui/react';
import { HiChevronUp } from 'react-icons/hi2';

import Badge from '@/components/common/Badge';
import theme from '@/styles/theme';

interface CorrectionItem {
  date: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  details: string;
}

const CorrectionHistory: React.FC = () => {
  const correctionItems: CorrectionItem[] = [
    {
      date: '2023-06-14',
      content: '무급 휴가 안 썼어요',
      status: 'pending',
      details: '상세 내용...',
    },
    {
      date: '2023-06-14',
      content: '무급 휴가 안 썼어요',
      status: 'approved',
      details: '상세 내용...',
    },
    {
      date: '2023-06-14',
      content: '간식비 또 주세요',
      status: 'rejected',
      details: '상세 내용...',
    },
    { date: '2023-06-14', content: '간식비 제발', status: 'approved', details: '상세 내용...' },
    {
      date: '2023-06-14',
      content: '무급 휴가 안 썼어요',
      status: 'approved',
      details: '상세 내용...',
    },
  ];

  return (
    <div css={containerStyle}>
      <h2 css={titleStyle}>정정 내역</h2>
      <div>
        {correctionItems.map((item, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div css={itemStyle}>
                <div css={cardStyle}>
                  <Disclosure.Button css={buttonStyle}>
                    <div css={headerStyle}>
                      <div css={dateStyle}>{item.date}</div>
                      <Badge
                        label={getStatusLabel(item.status)}
                        color={getStatusColor(item.status)}
                      />
                    </div>
                    <div css={contentStyle}>{item.content}</div>
                    <HiChevronUp
                      css={css`
                        ${chevronStyle}
                        transform: ${open ? 'rotate(180deg)' : 'rotate(0deg)'};
                      `}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel css={panelStyle}>{item.details}</Disclosure.Panel>
                </div>
              </div>
            )}
          </Disclosure>
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
  padding: 24px;
  background-color: ${theme.colors.bgGray};
  border-radius: 16px;
`;

const titleStyle = css`
  font-size: ${theme.fontSizes.xxlarge};
  font-weight: bold;
  margin-bottom: 24px;
  color: ${theme.colors.primary};
`;

const itemStyle = css`
  margin-bottom: 24px;
`;

const cardStyle = css`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const buttonStyle = css`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 16px;
  cursor: pointer;
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const dateStyle = css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.darkGray};
`;

const contentStyle = css`
  font-size: ${theme.fontSizes.large};
  font-weight: 500;
`;

const chevronStyle = css`
  width: 20px;
  height: 20px;
  margin-left: auto;
  transition: transform 0.2s ease-in-out;
`;

const panelStyle = css`
  padding: 16px;
  background-color: ${theme.colors.lightestGray};
  font-size: ${theme.fontSizes.normal};
`;

export default CorrectionHistory;
