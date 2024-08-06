import React, { useState, useEffect, useRef } from 'react';

import { css } from '@emotion/react';
import { Fieldset } from '@headlessui/react';
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';

import Button from '@/components/common/buttons/Button';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import theme from '@/styles/theme';

const CorrectionForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [category, setCategory] = useState('연장 근무');
  const [reason, setReason] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryOptions = ['연장 근무', '휴일 근무', '무급 휴가', '기타'];

  const isSubmitDisabled = !title.trim() || !reason.trim();

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')} (${['일', '월', '화', '수', '목', '금', '토'][today.getDay()]})`;
    setApplicationDate(formattedDate);
  }, []);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!isSubmitDisabled) {
      // 여기에 제출 로직 구현
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div css={containerStyle}>
      <form onSubmit={handleSubmit} css={formStyle} className='wrapper'>
        <Fieldset css={fieldsetStyle}>
          <div css={titleStyle}>
            <Input value={title} onChange={setTitle} placeholder='제목을 입력해주세요.' />
          </div>

          <div css={rowStyle}>
            <span css={labelStyle}>신청일</span>
            <span css={dateStyle}>{applicationDate}</span>
          </div>

          <div css={correctionStyle}>
            <span css={labelStyle}>정정항목</span>
            <div css={selectWrapperStyle}>
              <Select options={categoryOptions} selected={category} onChange={setCategory} />
            </div>
          </div>

          <div css={rowStyle}>
            <span css={labelStyle}>첨부파일</span>
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
                onClick={handleFileButtonClick}
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
            <Button
              onClick={() => handleSubmit()}
              styleType={isSubmitDisabled ? 'disabled' : 'primary'}
            >
              정정 신청하기
            </Button>
          </div>
        </Fieldset>
      </form>
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

const titleStyle = css`
  margin-bottom: 36px;
`;

const correctionStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  justify-content: space-between;
`;
const rowStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
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
  margin-bottom: 24px;
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
  gap: 12px;
`;

const fileNameStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkGray};
`;

export default CorrectionForm;
