import React, { useState, useRef } from 'react';

import { css } from '@emotion/react';
import { Fieldset } from '@headlessui/react';
import { HiOutlineDocumentArrowUp, HiPencil } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Header from '@/components/layout/Header';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

const CorrectionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [title, setTitle] = useState('무급 휴가 안 썼어요');
  const [applicationDate] = useState('2024/07/23 (화)');
  const [category, setCategory] = useState('연장 근무');
  const [reason, setReason] = useState('진짜로 무급 휴가 안 썼어요 정정해주세요');
  const [file, setFile] = useState<File | null>(null);

  const categoryOptions = ['연장 근무', '휴일 근무', '무급 휴가', '기타'];

  const handleGoBack = () => {
    navigate(PATH.SALARY, { state: { activeTab: 1 } });
  };

  const handleEdit = () => {
    navigate(`${PATH.SALARY}/${PATH.SALARY_CORRECTION_EDIT.replace(':id', id || '')}`);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    // 저장 로직 구현
    setIsEditing(false);
  };

  return (
    <div css={containerStyle}>
      <Header onBack={handleGoBack} />
      <div css={formStyle} className='wrapper'>
        <Fieldset css={fieldsetStyle}>
          <div css={titleContainerStyle}>
            {isEditing ? (
              <Input value={title} onChange={setTitle} placeholder='제목을 입력해주세요.' />
            ) : (
              <h1 css={titleStyle}>{title}</h1>
            )}
            {isPending && !isEditing && (
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
            {isEditing ? (
              <div css={selectWrapperStyle}>
                <Select options={categoryOptions} selected={category} onChange={setCategory} />
              </div>
            ) : (
              <span css={dateStyle}>{category}</span>
            )}
          </div>

          <div css={rowStyle}>
            <span css={labelStyle}>첨부파일</span>
            <div css={fileUploadStyle}>
              {file && (
                <span css={fileNameStyle} style={{ cursor: 'pointer' }}>
                  {file.name}
                </span>
              )}
              {isEditing && (
                <>
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <IconTextButton
                    Icon={HiOutlineDocumentArrowUp}
                    onClick={handleFileUpload}
                    iconPosition='left'
                    backgroundButton={false}
                  >
                    파일 추가
                  </IconTextButton>
                </>
              )}
              {!isEditing && !file && (
                <span css={dateStyle} style={{ cursor: 'pointer' }}>
                  근무 내역.jpg
                </span>
              )}
            </div>
          </div>

          <div css={reasonStyle}>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder='정정 사유를 입력해주세요.'
              css={textareaStyle}
              readOnly={!isEditing}
            />
          </div>
          {isEditing ? (
            <div css={buttonStyle}>
              <button css={primaryButtonStyle} onClick={handleSave}>
                수정하기
              </button>
              <button css={secondaryButtonStyle} onClick={() => setIsEditing(false)}>
                취소하기
              </button>
            </div>
          ) : (
            isPending && (
              <div css={buttonStyle}>
                <button css={cancelButtonStyle}>삭제하기</button>
              </div>
            )
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
  margin-bottom: 36px;
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

const selectWrapperStyle = css`
  position: relative;
  z-index: 1;

  & > div > div:last-child {
    position: absolute;
    background-color: ${theme.colors.white};
    width: 100%;
  }
`;

const buttonStyle = css`
  margin-bottom: 36px;
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
