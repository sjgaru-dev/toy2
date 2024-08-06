import React, { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { HiOutlineDocumentArrowUp, HiPencil } from 'react-icons/hi2';
import { useNavigate, useLocation } from 'react-router-dom';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import Select from '@/components/common/Select';
import Header from '@/components/layout/Header';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

const CorrectionDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [title] = useState('무급 휴가 안 썼어요');
  const [reason, setReason] = useState('진짜로 무급 휴가 안 썼어요 정정해주세요');
  const [correctionOptions] = useState(['연장 근무', '휴일 근무', '무급 휴가', '기타']);
  const [selectedCorrection, setSelectedCorrection] = useState('연장 근무');

  const handleGoBack = () => {
    navigate(PATH.SALARY, { state: { activeTab: 1 } });
  };

  useEffect(() => {
    const state = { from: location.pathname, activeTab: 1 };
    window.history.replaceState(state, '');
  }, [location.pathname]);

  return (
    <div css={pageStyle}>
      <Header onBack={handleGoBack} />
      <main css={mainStyle}>
        <div css={titleContainerStyle}>
          <h1 css={titleStyle}>{title}</h1>
          {!isEditing && (
            <IconTextButton Icon={HiPencil} onClick={() => setIsEditing(true)}>
              수정
            </IconTextButton>
          )}
        </div>

        <div css={dateStyle}>
          <span css={labelStyle}>신청일</span>
          <span>2024/07/23 (화)</span>
        </div>
        <div css={requestStyle}>
          <span css={labelStyle}>정정항목</span>
          {isEditing ? (
            <Select
              options={correctionOptions}
              selected={selectedCorrection}
              onChange={setSelectedCorrection}
            />
          ) : (
            <span>{selectedCorrection}</span>
          )}
        </div>
        <div css={fileStyle}>
          <span css={labelStyle}>첨부파일</span>
          {isEditing ? (
            <IconTextButton
              Icon={HiOutlineDocumentArrowUp}
              iconPosition='left'
              backgroundButton={false}
            >
              파일 추가
            </IconTextButton>
          ) : (
            <span>근무 내역.jpg</span>
          )}
        </div>
        <textarea
          css={textareaStyle}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          readOnly={!isEditing}
          className='textarea'
        />

        {isEditing ? (
          <>
            <button css={primaryButtonStyle} onClick={() => setIsEditing(false)}>
              수정하기
            </button>
            <button css={secondaryButtonStyle} onClick={() => setIsEditing(false)}>
              취소하기
            </button>
          </>
        ) : (
          <button css={cancelButtonStyle}>삭제하기</button>
        )}
      </main>
    </div>
  );
};

const pageStyle = css`
  background-color: ${theme.colors.bgGray};
`;

const mainStyle = css`
  padding: 16px;
  background-color: ${theme.colors.white};
`;

const titleContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const titleStyle = css`
  font-size: ${theme.fontSizes.xxlarge};
  font-weight: bold;
`;

const dateStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
  margin-top: 24px;
`;

const requestStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const fileStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
`;

const labelStyle = css`
  color: ${theme.colors.darkGray};
  vertical-align: middle;
`;

const textareaStyle = css`
  width: 100%;
  height: 300px;
  padding: 16px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  font-size: ${theme.fontSizes.large};
  resize: none;
  margin-bottom: 16px;

  &::placeholder {
    color: ${theme.colors.darkGray};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const buttonBaseStyle = css`
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  font-size: ${theme.fontSizes.normal};
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;

const primaryButtonStyle = css`
  ${buttonBaseStyle}
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  margin-bottom: 16px;
`;

const secondaryButtonStyle = css`
  ${buttonBaseStyle}
  background-color: transparent;
  color: ${theme.colors.darkGray};
`;

const cancelButtonStyle = css`
  ${buttonBaseStyle}
  background-color: ${theme.colors.lightestGray};
  color: ${theme.colors.darkGray};
`;

export default CorrectionDetail;
