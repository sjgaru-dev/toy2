import React, { useState, useRef } from 'react';

import { css } from '@emotion/react';
import { Fieldset, Label } from '@headlessui/react';
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Header from '@/components/layout/Header';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

const CorrectionEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('무급 휴가 안 썼어요');
  const [category, setCategory] = useState('연장 근무');
  const [reason, setReason] = useState('진짜로 무급 휴가 안 썼어요 정정해주세요');
  const [files, setFiles] = useState<File[]>(location.state?.files || []);

  const categoryOptions = ['연장 근무', '휴일 근무', '무급 휴가', '기타'];

  const handleGoBack = () => {
    navigate(`${PATH.SALARY}/${PATH.SALARY_CORRECTION_DETAIL.replace(':id', id || '')}`);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    // 저장 로직 구현
    navigate(`${PATH.SALARY}/${PATH.SALARY_CORRECTION_DETAIL.replace(':id', id || '')}`);
  };

  return (
    <div css={containerStyle}>
      <Header onBack={handleGoBack} />
      <div css={formStyle} className='wrapper'>
        <Fieldset css={fieldsetStyle}>
          <div css={titleContainerStyle}>
            <Input value={title} onChange={setTitle} placeholder='제목을 입력해주세요.' />
          </div>

          <div css={rowStyle}>
            <Label css={labelStyle}>신청일</Label>
            <span css={dateStyle}>2024/07/23 (화)</span>
          </div>

          <div css={correctionEditStyle}>
            <Label css={labelStyle}>정정항목</Label>
            <div css={selectWrapperStyle}>
              <Select options={categoryOptions} selected={category} onChange={setCategory} />
            </div>
          </div>

          <div css={rowStyle}>
            <Label css={labelStyle}>첨부파일</Label>
            <div css={fileUploadStyle}>
              {files.length === 1 && <span css={fileNameStyle}>{files[0].name}</span>}
              {files.length > 1 && <span css={fileNameStyle}>파일 {files.length}개</span>}
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                multiple
              />
              <IconTextButton
                Icon={HiOutlineDocumentArrowUp}
                onClick={handleFileUpload}
                iconPosition='left'
                backgroundButton={true}
              >
                파일 추가
              </IconTextButton>
            </div>
          </div>

          <div css={reasonStyle}>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder='정정 사유를 입력해주세요.'
              css={textareaStyle}
            />
          </div>

          <div css={buttonStyle}>
            <button css={primaryButtonStyle} onClick={handleSave}>
              수정하기
            </button>
            <button css={secondaryButtonStyle} onClick={handleGoBack}>
              취소하기
            </button>
          </div>
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
  margin-bottom: 36px;
`;

const rowStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  justify-content: space-between;
`;

const correctionEditStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
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

const selectWrapperStyle = css`
  position: relative;
  z-index: 1;

  & > div > div:last-child {
    position: absolute;
    background-color: ${theme.colors.white};
    width: 100%;
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

export default CorrectionEdit;
