import React, { useState, useEffect, useRef } from 'react';

import { css } from '@emotion/react';
import { Fieldset } from '@headlessui/react';
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/buttons/Button';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Spinner from '@/components/common/Spinner';
import { PATH } from '@/constants/path';
import useToast from '@/hooks/useToast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAddCorrection } from '@/store/reducer/payrollSlice';
import theme from '@/styles/theme';
import { CorrectionProps } from '@/types/payroll';
import { checkAuth, getUID } from '@/utils/auth';
import { convertDateWithFormat } from '@/utils/dailySchedule';

const CorrectionForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('연장 근무');
  const [reason, setReason] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryOptions = ['연장 근무', '휴일 근무', '무급 휴가', '기타'];

  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    setActive(!title.trim() || !reason.trim());
  }, [title, reason]);

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.payroll);

  const { toastTrigger } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!checkAuth() || !getUID()) return;
    const props: CorrectionProps = {
      id: 0,
      salaryId: 0,
      userNo: '',
      requestDate: convertDateWithFormat(new Date()),
      type: category,
      status: '대기',
      subject: title,
      content: reason,
      attachFile: files,
    };

    dispatch(fetchAddCorrection(props)).then((status) => {
      if (status.meta.requestStatus === 'fulfilled') {
        toastTrigger('정정신청이 등록되었습니다');
        navigate(PATH.SALARY_CORRECTION_HISTORY);
      }
    });
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
            <span css={dateStyle}>{convertDateWithFormat(new Date(), 'YYYY-MM-DD (ddd)')}</span>
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
                type='button'
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
            <Button onClick={handleSubmit} styleType={isActive ? 'disabled' : 'primary'}>
              {status === 'loading' ? <Spinner /> : '정정 신청하기'}
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
  padding-top: 20px;
`;

const titleStyle = css`
  margin-bottom: 0.5rem;
  input {
    height: ${theme.heights.medium};
    padding: 0 12px;
    font-size: ${theme.fontSizes.large};
  }
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
  justify-content: space-between;
  height: ${theme.heights.xtall};
  padding: 0 12px;
`;

const labelStyle = css`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.darkestGray};
`;

const dateStyle = css`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.darkestGray};
`;

const reasonStyle = css`
  margin: 8px 0 24px;
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
    border-color: ${theme.colors.darkGray};
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
  margin-bottom: 24px;
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
