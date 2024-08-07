import React, { useState, useRef, useEffect } from 'react';

import { css } from '@emotion/react';
import { Fieldset, Label } from '@headlessui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import { db } from '@/api';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import Header from '@/components/layout/Header';
import { PATH } from '@/constants/path';
import useToast from '@/hooks/useToast';
import theme from '@/styles/theme';
import { CorrectionProps } from '@/types/payroll';

const CorrectionEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toastTrigger } = useToast();

  const [correction, setCorrection] = useState<Partial<CorrectionProps> | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryOptions = ['연장 근무', '휴일 근무', '무급 휴가', '기타'];

  useEffect(() => {
    const fetchCorrection = async () => {
      if (!id) return;
      const docRef = doc(db, 'SalaryRequest', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCorrection({ id: docSnap.id, ...docSnap.data() } as unknown as CorrectionProps);
      }
    };
    fetchCorrection();
  }, [id]);

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

  const handleSave = async () => {
    if (!correction || !id) return;
    try {
      await updateDoc(doc(db, 'SalaryRequest', id), correction);
      toastTrigger('정정내역이 수정되었습니다');
      navigate(`${PATH.SALARY}/${PATH.SALARY_CORRECTION_DETAIL.replace(':id', id)}`);
    } catch (error) {
      toastTrigger('정정내역 수정에 실패했습니다');
    }
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const confirmEdit = () => {
    handleSave();
  };

  return (
    <div css={containerStyle}>
      <Header onBack={handleGoBack} />
      <div css={formStyle} className='wrapper'>
        <Fieldset css={fieldsetStyle}>
          <div css={titleContainerStyle}>
            <Input
              value={correction?.subject ?? ''}
              onChange={(value) => setCorrection({ ...correction, subject: value })}
              placeholder='제목을 입력해주세요.'
            />
          </div>

          <div css={rowStyle}>
            <Label css={labelStyle}>신청일</Label>
            <span css={dateStyle}>{correction?.requestDate}</span>
          </div>

          <div css={correctionEditStyle}>
            <Label css={labelStyle}>정정항목</Label>
            <div css={selectWrapperStyle}>
              <Select
                options={categoryOptions}
                selected={correction?.type || ''}
                onChange={(value) => setCorrection({ ...correction, type: value })}
              />
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
              value={correction?.content ?? ''}
              onChange={(e) => setCorrection({ ...correction, content: e.target.value })}
              placeholder='정정 사유를 입력해주세요.'
              css={textareaStyle}
            />
          </div>

          <div css={buttonStyle}>
            <button css={primaryButtonStyle} onClick={handleEdit}>
              수정하기
            </button>
            <button css={secondaryButtonStyle} onClick={handleGoBack}>
              취소하기
            </button>
          </div>
        </Fieldset>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmEdit}
          styleType='primary'
          title='변경사항을 저장하시겠습니까?'
          confirmText={'저장하기'}
        />
      )}
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
  margin-bottom: 0.5rem;
  input {
    height: ${theme.heights.medium};
    padding: 0 12px;
    font-size: ${theme.fontSizes.large};
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
    }
  }
`;

const rowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${theme.heights.xtall};
  padding: 0 12px;
`;

const correctionEditStyle = css`
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
  gap: 12px;
`;

const fileNameStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkGray};
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
