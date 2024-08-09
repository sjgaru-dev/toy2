import React, { useState, useEffect, useRef } from 'react';

import { css } from '@emotion/react';
import { Fieldset } from '@headlessui/react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { HiPencil } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import { db, storage } from '@/api';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Modal from '@/components/common/Modal';
import Header from '@/components/layout/Header';
import { PATH } from '@/constants/path';
import useToast from '@/hooks/useToast';
import theme from '@/styles/theme';
import { CorrectionProps } from '@/types/payroll';

const CorrectionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const correctionContainerRef = useRef<HTMLDivElement>(null);
  const [correction, setCorrection] = useState<CorrectionProps | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toastTrigger } = useToast();

  useEffect(() => {
    const fetchCorrectionDetail = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'SalaryRequest', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCorrection({ id: docSnap.id, ...docSnap.data() } as unknown as CorrectionProps);
        }
      } finally {
        setIsPending(false);
      }
    };
    fetchCorrectionDetail();
  }, [id]);

  const handleGoBack = () => {
    navigate(PATH.SALARY, { state: { activeTab: 1 } });
  };

  const handleEdit = () => {
    if (!isPending && correction) {
      navigate(`${PATH.SALARY}/${PATH.SALARY_CORRECTION_EDIT.replace(':id', id || '')}`, {
        state: { correction },
      });
    }
  };

  const handleFileDownload = async (fileUrl: string) => {
    if (!fileUrl) {
      return;
    }
    try {
      const url = await getDownloadURL(ref(storage, fileUrl));
      window.open(url, '_blank');
    } catch (error) {
      toastTrigger('파일 다운로드에 실패했습니다.');
    }
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!isPending && id) {
      try {
        await deleteDoc(doc(db, 'SalaryRequest', id));
        toastTrigger('정정내역이 삭제되었습니다');
        navigate(PATH.SALARY, { state: { activeTab: 1 } });
      } catch (error) {
        toastTrigger('정정내역 삭제에 실패했습니다');
      }
    }
    setIsModalOpen(false);
  };

  const getFileName = (fileUrl: string) => {
    const decodedUrl = decodeURIComponent(fileUrl);
    return decodedUrl.split('/').pop()?.split('?')[0] || '';
  };

  return (
    <div css={containerStyle}>
      <Header onBack={handleGoBack} />
      <div css={formStyle} className='wrapper' ref={correctionContainerRef}>
        <Fieldset css={fieldsetStyle}>
          <div css={titleContainerStyle}>
            {correction && <h1 css={titleStyle}>{correction.subject}</h1>}
            {!isPending && correction?.status === '대기' && (
              <IconTextButton Icon={HiPencil} onClick={handleEdit}>
                수정
              </IconTextButton>
            )}
          </div>

          <div css={rowStyle}>
            <span css={labelStyle}>신청일</span>
            {correction && <span css={dateStyle}>{correction.requestDate}</span>}
          </div>

          <div css={correctionStyle}>
            <span css={labelStyle}>정정항목</span>
            {correction && <span css={dateStyle}>{correction.type}</span>}
          </div>

          <div css={[rowStyle, fileContainerStyle]}>
            <span css={labelStyle}>첨부파일</span>
            <div>
              {correction && Array.isArray(correction.attach) && correction.attach.length > 0 ? (
                correction.attach.map((fileUrl, index) => (
                  <div key={index} css={fileItemStyle}>
                    <span css={fileNameStyle} onClick={() => handleFileDownload(fileUrl)}>
                      {getFileName(fileUrl)}
                    </span>
                  </div>
                ))
              ) : correction && correction.attach ? (
                <div css={fileItemStyle}>
                  <span
                    css={fileNameStyle}
                    onClick={() => handleFileDownload(correction.attach ?? '')}
                  >
                    {getFileName(correction.attach ?? '')}
                  </span>
                </div>
              ) : (
                <div css={fileItemStyle}>
                  <span css={fileNameStyle}>첨부파일 없음</span>
                </div>
              )}
            </div>
          </div>

          <div css={reasonStyle}>
            <textarea
              value={correction ? correction.content : ''}
              readOnly
              placeholder='정정 사유를 입력해주세요.'
              css={textareaStyle}
            />
          </div>
          {!isPending && correction?.status === '대기' && (
            <div css={buttonStyle}>
              <button css={cancelButtonStyle} onClick={handleDelete}>
                삭제하기
              </button>
            </div>
          )}
        </Fieldset>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={confirmDelete}
            styleType='secondary'
            title='삭제하시겠습니까?'
            confirmText={'삭제하기'}
          />
        )}
      </div>
    </div>
  );
};

const containerStyle = css`
  background-color: ${theme.colors.white};
  padding-bottom: 80px;
`;

const formStyle = css`
  background-color: ${theme.colors.white};
`;

const fieldsetStyle = css`
  border: none;
  padding-top: 12px;
`;

const titleContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 0 12px;
`;

const titleStyle = css`
  font-size: ${theme.fontSizes.xxlarge};
  font-weight: bold;
`;

const correctionStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 12px;
`;

const rowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
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
  padding: 12px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.darkestGray};
  line-height: 160%;
  resize: none;

  &::placeholder {
    color: ${theme.colors.darkGray};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.darkGray};
  }
`;

const fileContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
  padding-bottom: 12px;
  height: 100%;
`;

const fileItemStyle = css`
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const fileNameStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkGray};
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  line-height: 1.5;
`;

const buttonStyle = css`
  margin-bottom: 36px;
`;

const buttonBaseStyle = css`
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  font-size: ${theme.fontSizes.large};
  font-weight: 600;
  text-align: center;
  cursor: pointer;
`;

const cancelButtonStyle = css`
  ${buttonBaseStyle}
  background-color: ${theme.colors.lightestGray};
  color: ${theme.colors.darkGray};
`;

export default CorrectionDetail;
