import React, { useState, useEffect, useRef } from 'react';

import { css } from '@emotion/react';
import { Fieldset } from '@headlessui/react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { HiPencil } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import { db } from '@/api';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Header from '@/components/layout/Header';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';
import { CorrectionProps } from '@/types/payroll';

const CorrectionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const correctionContainerRef = useRef<HTMLDivElement>(null);
  const [correction, setCorrection] = useState<CorrectionProps | null>(null);
  const [isPending, setIsPending] = useState(true);

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

  const handleFileDownload = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  const handleDelete = async () => {
    if (!isPending && id) {
      await deleteDoc(doc(db, 'SalaryRequest', id));
      navigate(PATH.SALARY, { state: { activeTab: 1 } });
    }
  };

  const getFileName = (fileUrl: string) => {
    const decodedUrl = decodeURIComponent(fileUrl);
    return decodedUrl.split('/').pop()?.split('?')[0] || '파일';
  };

  return (
    <div css={containerStyle}>
      <Header onBack={handleGoBack} />
      <div css={formStyle} className='wrapper' ref={correctionContainerRef}>
        <Fieldset css={fieldsetStyle}>
          <div css={titleContainerStyle}>
            {correction && <h1 css={titleStyle}>{correction.subject}</h1>}
            {!isPending && (
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

          <div css={rowStyle}>
            <span css={labelStyle}>첨부파일</span>
            <div css={fileUploadStyle}>
              {correction && Array.isArray(correction.attach) ? (
                correction.attach.map((fileUrl, index) => (
                  <span
                    key={index}
                    css={fileNameStyle}
                    onClick={() => handleFileDownload(fileUrl)}
                    style={{ cursor: 'pointer' }}
                  >
                    {getFileName(fileUrl)}
                  </span>
                ))
              ) : correction && correction.attach ? (
                <span
                  css={fileNameStyle}
                  onClick={() => correction.attach && handleFileDownload(correction.attach)}
                  style={{ cursor: 'pointer' }}
                >
                  {getFileName(correction.attach)}
                </span>
              ) : (
                <span css={dateStyle}>없음</span>
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
          {!isPending && (
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
