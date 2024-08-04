import { useState } from 'react';

import { css } from '@emotion/react';
import { MdDelete, MdEdit, MdOutlineCameraAlt } from 'react-icons/md';

import { getUserData } from '@/api/User';
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
  const [imgUrl, setImgUrl] = useState(user.pic);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const defaultImgUrl = '/src/assets/images/user_default.svg';

  const handleDeleteImgClick = () => {
    setImgUrl(defaultImgUrl);
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
      {/* {isEditing && <Header />} */}

      <div css={wrapperStyle}>
        <div>
          <img src={imgUrl} css={imgStyle} />
          {isEditing && (
            <div css={caremaIconStyle}>
              <MdOutlineCameraAlt size={24} />
            </div>
          )}
        </div>
        <div css={editIconStyle}>
          {!isEditing && (
            <IconTextButton Icon={MdEdit} onClick={handleEditClick}>
              프로필 수정
            </IconTextButton>
          )}
          {isEditing && (
            <IconTextButton Icon={MdDelete} onClick={handleDeleteImgClick}>
              이미지 삭제
            </IconTextButton>
          )}
        </div>
      </div>

      <div css={[formStyle]}>
        {isEditing && (
          <Input
            label='비밀번호'
            value={inputValue}
            placeholder='수정하실 비밀번호를 입력하세요'
            onChange={handleInputChange}
            type='password'
            readOnly={!isEditing}
          />
        )}
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
      <div css={signOutButtonStyle}>
        {!isEditing && <Button styleType='tertiary'>로그아웃</Button>}
        {isEditing && (
          <>
            <div css={editButtonStyle}>
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
  padding: 3rem;
  text-align: center;
  justify-content: center;
  background-color: ${theme.colors.white};
`;

const imgStyle = css`
  position: relative;
  display: inline-block;
  width: 120px;
  border-radius: 50%;
`;

const caremaIconStyle = css`
  position: absolute;
  bottom: 10px;
  right: -10px;
  background-color: ${theme.colors.toastGray};
  color: white;
  border-radius: 50%;
  border: 2px solid white;
  padding: 8px 8px 4px 8px;
`;

const editIconStyle = css`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 1rem;
`;

const formStyle = css`
  margin-top: 12px;
  padding: 20px 25px;
  background-color: ${theme.colors.white};
`;

const signOutButtonStyle = css`
  padding-bottom: 80px;
`;

const editButtonStyle = css`
  margin: 1rem;
`;

export default ProfilePage;
