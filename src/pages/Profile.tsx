import { useState } from 'react';

import { css } from '@emotion/react';
import { MdDelete, MdEdit, MdOutlineCameraAlt } from 'react-icons/md';

import Button from '@/components/common/buttons/Button';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Header from '@/components/layout/Header';
import theme from '@/styles/theme';

export const user = {
  name: '홍길동',
  nickname: 'gildong',
  email: 'abd@abc.com',
  password: '1234asdf',
  phone: '010-1234-5678',
  birth: '1990-01-01',
  part: '개발팀',
  position: '개발자',
  joinDate: '2021-01-01',
  pic: 'https://firebasestorage.googleapis.com/v0/b/tiramisu-31d41.appspot.com/o/1.jpg?alt=media&token=c69fefa1-e36e-4cf6-bcd6-06b075fe8166',
};

const ProfilePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsModalOpen(true);
    setInputValue('');
  };

  const handleModalConfirm = () => {
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setInputValue('');
  };

  return (
    <div>
      {isEditing && <Header />}
      <div
        css={wrapperStyle}
        style={{
          display: 'block',
          textAlign: 'center',
          justifyContent: 'center',
          padding: '2rem 0',
        }}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img src={user.pic} width='120px' alt='profile' style={{ borderRadius: '50%' }} />
          {isEditing && (
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '-10px',
                backgroundColor: theme.colors.toastGray,
                color: 'white',
                borderRadius: '50%',
                border: '2px solid white',
                padding: '8px 8px 4px 8px',
              }}
            >
              <MdOutlineCameraAlt size={24} />
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          {!isEditing && (
            <IconTextButton Icon={MdEdit} onClick={handleEditClick}>
              프로필 수정
            </IconTextButton>
          )}
          {isEditing && (
            <>
              <IconTextButton Icon={MdDelete} onClick={handleEditClick}>
                이미지 삭제
              </IconTextButton>
            </>
          )}
        </div>
      </div>
      <div css={[formStyle, wrapperStyle]}>
        {/* Button components */}
        <Input
          label='이름'
          value={user.name}
          placeholder='이름을 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={true}
        />
        <Input
          label='닉네임'
          value={user.nickname}
          placeholder='닉네임을 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={!isEditing}
        />
        <Input
          label='이메일'
          value={user.email}
          placeholder='이메일을 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={true}
        />
        <Input
          label='비밀번호'
          value={inputValue}
          placeholder='비밀번호를 입력하세요'
          onChange={handleInputChange}
          type='password'
          readOnly={!isEditing}
        />
        <Input
          label='연락처'
          value={user.phone}
          placeholder='연락처를 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={!isEditing}
        />
        <Input
          label='생일'
          value={user.birth}
          placeholder='생일을 입력하세요'
          onChange={handleInputChange}
          type='date'
          readOnly={true}
        />{' '}
        <Input
          label='부서'
          value={user.part}
          placeholder='부서를 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={true}
        />
        <Input
          label='직무'
          value={user.position}
          placeholder='직무를 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={true}
        />
        <Input
          label='입사일'
          value={user.joinDate}
          placeholder='입사일을 입력하세요'
          onChange={handleInputChange}
          type='date'
          readOnly={true}
        />
      </div>
      <div css={signOutButtonDivStyle}>
        {!isEditing && <Button styleType='tertiary'>로그아웃</Button>}
        {isEditing && (
          <>
            <div style={{ margin: '1rem' }}>
              <Button>수정하기</Button>
              <Button styleType='ghost' onClick={handleCancelClick}>
                취소
              </Button>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={true}
          title='변경사항을 저장하시겠습니까?'
          confirmText='저장하기'
          onClose={handleModalCancel}
          cancelText='취소하기'
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};

const wrapperStyle = css`
  background-color: ${theme.colors.white};
`;

const formStyle = css`
  margin-top: 12px;
  padding: 20px 16px;
`;

const signOutButtonDivStyle = css`
  padding-bottom: 80px;

  button {
    border-radius: 0;
  }
`;

export default ProfilePage;
