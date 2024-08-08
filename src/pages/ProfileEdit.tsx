import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import firebase from 'firebase/compat/app';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import { db, storage } from '@/api';
import { getUserData } from '@/api/user';
import userDefaultSvg from '@/assets/images/user_default.svg';
import Button from '@/components/common/buttons/Button';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Input from '@/components/common/Input';
import Spinner from '@/components/common/Spinner';
import Header from '@/components/layout/Header';
import { PATH } from '@/constants/path';
import useToast from '@/hooks/useToast';
import theme from '@/styles/theme';
import type { UserType } from '@/types/type';
import { getUID } from '@/utils/auth';

const UpdatedData: { [key: string]: string } = {};

const formatDate = (timestamp: firebase.firestore.Timestamp): string => {
  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserType>();
  const [inputNickValue, setInputNickValue] = useState('');
  const [inputPhoneValue, setInputPhoneValue] = useState('');
  const [inputImgValue, setInputImgValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { toastTrigger } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(await getUID());
      setUserData(data);
      setInputNickValue(data.nickname);
      setInputPhoneValue(data.phone);
    };
    fetchData();
  }, []);

  const handleChangeImg = async () => {
    try {
      setUserData(await getUserData(await getUID()));
      if (userData) {
        const storageRef = ref(storage, `profile/${userData.userNo}`);
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file && file.size <= 2 * 1024 * 1024) {
            setLoading(true);
            const fileRef = ref(storageRef, 'profile.jpg');
            await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(fileRef);
            setUserData({ ...userData, img: downloadURL });
            setInputImgValue(downloadURL);
          } else if (file && file.size > 2 * 1024 * 1024) {
            toastTrigger('파일 크기가 제한을 초과했습니다. (최대 2MB)');
            console.error('File size exceeds the limit');
          } else {
            setInputImgValue(userData.img);
          }
          setLoading(false);
        };
        fileInput.click();
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  const handleDeleteImg = () => {
    setUserData(Object.assign({}, userData, { img: userDefaultSvg }));
    setInputImgValue(userDefaultSvg);
  };
  const handleInputChangeNick = (value: string) => {
    setInputNickValue(value);
  };
  const handleInputChangePhone = (value: string) => {
    const formattedValue = value
      .replace(/[^0-9]/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setInputPhoneValue(formattedValue);
  };
  const navigate = useNavigate();
  const handleUpdateClick = async () => {
    try {
      const uid = await getUID();
      const userData = await getUserData(uid);
      if (userData) {
        const userRef = collection(db, 'User');
        const queryRef = query(userRef, where('userNo', '==', userData.userNo));
        const fetchResult = await getDocs(queryRef);
        if (!fetchResult.empty) {
          const userData = fetchResult.docs[0];
          const updatedData: typeof UpdatedData = {};
          if (inputNickValue) updatedData.nickname = inputNickValue;
          if (inputPhoneValue) updatedData.phone = inputPhoneValue;
          if (inputImgValue) updatedData.img = inputImgValue;
          await updateDoc(userData.ref, updatedData);
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    navigate(PATH.PROFILE);
  };

  return (
    <div>
      <Header />
      {loading && (
        <div css={spinnerWrapperStyle}>
          <Spinner />
        </div>
      )}
      <div css={wrapperStyle}>
        <div css={imgStyle}>
          <img src={userData?.img || userDefaultSvg} css={imgStyle} />
          <div css={cameraIconStyle}>
            <HiOutlinePhotograph size={20} onClick={handleChangeImg} />
          </div>
        </div>
        <div css={editIconStyle}>
          <IconTextButton Icon={HiOutlineTrash} onClick={handleDeleteImg}>
            이미지 삭제
          </IconTextButton>
        </div>
      </div>

      <div css={[formStyle]}>
        <Input
          label='닉네임'
          value={inputNickValue}
          placeholder='수정하실 닉네임을 입력하세요'
          onChange={handleInputChangeNick}
          type='text'
          readOnly={false}
        />
        <Input
          label='연락처'
          value={inputPhoneValue}
          placeholder='수정하실 연락처를 숫자만 입력하세요.'
          onChange={handleInputChangePhone}
          type='text'
          readOnly={false}
        />
        <Input
          label='이름'
          value={userData ? userData.name : ''}
          placeholder='이름을 입력하세요'
          onChange={() => {}}
          type='text'
          readOnly={true}
        />
        <Input
          label='이메일'
          value={userData ? userData.email : ''}
          placeholder='이메일을 입력하세요'
          onChange={() => {}}
          type='text'
          readOnly={true}
        />
        <Input
          label='생일'
          value={userData?.birthday ? formatDate(userData.birthday) : ''}
          placeholder='생일을 입력하세요'
          onChange={() => {}}
          type='date'
          readOnly={true}
        />{' '}
        <Input
          label='부서'
          value={userData ? userData.team : ''}
          placeholder='부서를 입력하세요'
          onChange={() => {}}
          type='text'
          readOnly={true}
        />
        <Input
          label='직무'
          value={userData ? userData.position : ''}
          placeholder='직무를 입력하세요'
          onChange={() => {}}
          type='text'
          readOnly={true}
        />
        <Input
          label='입사일'
          value={userData?.hireDate ? formatDate(userData.hireDate) : ''}
          placeholder='입사일을 입력하세요'
          onChange={() => {}}
          type='date'
          readOnly={true}
        />
      </div>
      <div css={signOutButtonStyle}>
        <div>
          <Button onClick={handleUpdateClick}>수정하기</Button>
        </div>
      </div>
    </div>
  );
};

const wrapperStyle = css`
  padding-bottom: 3rem;
  text-align: center;
  justify-content: center;
  background-color: ${theme.colors.white};
`;

const spinnerWrapperStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1000;
`;

const imgStyle = css`
  position: relative;
  display: inline-block;
  width: 120px;
  height: auto;
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const cameraIconStyle = css`
  position: absolute;
  bottom: 10px;
  right: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.darkestGray};
  color: white;
  border-radius: 50%;
  border: 3px solid white;
  cursor: pointer;
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
  padding: 12px 16px 80px;
  background-color: ${theme.colors.white};
`;

export default ProfilePage;
