import React, { useState, useRef } from 'react';

import { css } from '@emotion/react';
import { Fieldset } from '@headlessui/react';
import { HiPencil } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import Header from '@/components/layout/Header';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

const CorrectionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const correctionContainerRef = useRef<HTMLDivElement>(null);
  const [title] = useState('무급 휴가 안 썼어요');
  const [applicationDate] = useState('2024/07/23 (화)');
  const [category] = useState('연장 근무');
  const [reason] = useState('진짜로 무급 휴가 안 썼어요 정정해주세요');
  const [file] = useState<File | null>(new File([''], '근무 내역.jpg'));
  const [isPending] = useState(true);

  const handleGoBack = () => {
    navigate(PATH.SALARY, { state: { activeTab: 1 } });
  };

  const handleEdit = () => {
    if (isPending) {
      navigate(`${PATH.SALARY}/${PATH.SALARY_CORRECTION_EDIT.replace(':id', id || '')}`, {
        state: { file },
      });
    }
  };

  const handleFileDownload = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = () => {
    if (isPending) {
      // 삭제 로직 구현
    }
  };

  return (
    <div css={containerStyle}>
      <Header onBack={handleGoBack} />
      <div css={formStyle} className='wrapper' ref={correctionContainerRef}>
        <Fieldset css={fieldsetStyle}>
          <div css={titleContainerStyle}>
            <h1 css={titleStyle}>{title}</h1>
            {isPending && (
              <IconTextButton Icon={HiPencil} onClick={handleEdit}>
                수정
              </IconTextButton>
            )}
          </div>

          <div css={rowStyle}>
            <span css={labelStyle}>신청일</span>
            <span css={dateStyle}>{applicationDate}</span>
          </div>

          <div css={correctionStyle}>
            <span css={labelStyle}>정정항목</span>
            <span css={dateStyle}>{category}</span>
          </div>

          <div css={rowStyle}>
            <span css={labelStyle}>첨부파일</span>
            <div css={fileUploadStyle}>
              {file ? (
                <span
                  css={fileNameStyle}
                  onClick={handleFileDownload}
                  style={{ cursor: 'pointer' }}
                >
                  {file.name}
                </span>
              ) : (
                <span css={dateStyle} style={{ cursor: 'pointer' }}>
                  근무 내역.jpg
                </span>
              )}
            </div>
          </div>

          <div css={reasonStyle}>
            <textarea
              value={reason}
              readOnly
              placeholder='정정 사유를 입력해주세요.'
              css={textareaStyle}
            />
          </div>
          {isPending && (
            <div css={buttonStyle}>
              <button css={cancelButtonStyle} onClick={handleDelete}>
                삭제하기
              </button>
            </div>
          )}
        </Fieldset>
      </div>
    </div>
  );
};

const containerStyle = css`
  background-color: ${theme.colors.white};
`;

const formStyle = css`
  background-color: ${theme.colors.white};
`;

const fieldsetStyle = css`
  border: none;
  padding-top: 32px;
`;

const titleContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
`;

const titleStyle = css`
  font-size: ${theme.fontSizes.xxlarge};
  font-weight: bold;
`;

const correctionStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  justify-content: space-between;
`;

const rowStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 36px;
  justify-content: space-between;
`;

const labelStyle = css`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.darkGray};
`;

const dateStyle = css`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.darkestGray};
`;

const reasonStyle = css`
  margin-bottom: 36px;
`;

const textareaStyle = css`
  width: 100%;
  height: 300px;
  padding: 16px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.darkestGray};
  resize: none;

  &::placeholder {
    color: ${theme.colors.darkGray};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const fileUploadStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const fileNameStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkGray};
`;

const buttonStyle = css`
  margin-bottom: 36px;
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

const cancelButtonStyle = css`
  ${buttonBaseStyle}
  background-color: ${theme.colors.lightestGray};
  color: ${theme.colors.darkGray};
`;

export default CorrectionDetail;
