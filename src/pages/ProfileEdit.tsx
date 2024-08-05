import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { MdDelete, MdEdit, MdOutlineCameraAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { db } from '@/api';
import Button from '@/components/common/buttons/Button';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Header from '@/components/layout/Header';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSignOut } from '@/store/reducer/authSlice';
import theme from '@/styles/theme';
import type { UserType } from '@/types/type';

const formatDate = (timestamp: firebase.firestore.Timestamp): string => {
  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ProfileEdit = () => {
  const [userData, setUserData] = useState<UserType>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const { uid } = user;
          const fetchResult = await getDocs(query(collection(db, 'User'), where('uid', '==', uid)));
          if (!fetchResult.empty) {
            const userData = fetchResult.docs[0].data();
            setUserData(userData);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const defaultImg = '/src/assets/images/user_default.svg';

  const handleDeleteImgClick = () => {
    setImgUrl(defaultImg);
  };

  return (
    <div>
      <Header />
      <div css={wrapperStyle}>
        <div css={imgStyle}>
          <img src={userData?.img || defaultImg} css={imgStyle} />
          <div css={caremaIconStyle}>
            <MdOutlineCameraAlt size={24} />
          </div>
        </div>
        <div css={editIconStyle}>
          <IconTextButton Icon={MdDelete} onClick={handleDeleteImgClick}>
            이미지 삭제
          </IconTextButton>
        </div>
      </div>

      <div css={[formStyle]}>
        <Input
          label='비밀번호'
          value={inputValue}
          placeholder='수정하실 비밀번호를 입력하세요'
          onChange={handleInputChange}
          type='password'
          readOnly={false}
        />
        <Input
          label='이름'
          value={userData.name}
          placeholder='이름을 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={true}
        />
        <Input
          label='닉네임'
          value={userData.nickname}
          placeholder='닉네임을 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={false}
        />
        <Input
          label='이메일'
          value={userData.email}
          placeholder='이메일을 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={true}
        />
        <Input
          label='연락처'
          value={userData.phone}
          placeholder='연락처를 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={false}
        />
        <Input
          label='생일'
          value={userData.birthday ? formatDate(userData.birthday) : ''}
          placeholder='생일을 입력하세요'
          onChange={handleInputChange}
          type='date'
          readOnly={true}
        />{' '}
        <Input
          label='부서'
          value={userData.team}
          placeholder='부서를 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={true}
        />
        <Input
          label='직무'
          value={userData.position}
          placeholder='직무를 입력하세요'
          onChange={handleInputChange}
          type='text'
          readOnly={true}
        />
        <Input
          label='입사일'
          value={userData.hireDate ? formatDate(userData.hireDate) : ''}
          placeholder='입사일을 입력하세요'
          onChange={handleInputChange}
          type='date'
          readOnly={true}
        />
      </div>
      <div css={signOutButtonStyle}>
        <div css={editButtonStyle}>
          <Button>수정하기</Button>
        </div>
      </div>
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

export default ProfileEdit;
