import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import firebase from 'firebase/compat/app';
import { HiOutlinePencil } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import { getUserData } from '@/api/user';
import userDefaultSvg from '@/assets/images/user_default.svg';
import Button from '@/components/common/buttons/Button';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { PATH } from '@/constants/path';
import { useAppDispatch } from '@/store/hooks';
import { fetchSignOut } from '@/store/reducer/authSlice';
import { setFetchedFalse } from '@/store/reducer/scheduleSlice';
import theme from '@/styles/theme';
import type { UserType } from '@/types/type';
import { getUID } from '@/utils/auth';

const formatDate = (timestamp: firebase.firestore.Timestamp): string => {
  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserType>();

  const defaultImg = userDefaultSvg;

  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/profile/edit`);
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const dispatch = useAppDispatch();

  const handleModalLogout = async () => {
    await dispatch(fetchSignOut()).then((state) => {
      if (state.meta.requestStatus === 'fulfilled') {
        dispatch(setFetchedFalse());
        navigate(PATH.SIGNIN);
      }
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      setUserData(await getUserData(await getUID()));
    })();
  }, []);

  return (
    <div>
      <div css={wrapperStyle}>
        <div css={imgStyle}>
          <img src={userData?.img || defaultImg} css={imgStyle} />
        </div>
        <div css={editIconStyle}>
          <IconTextButton Icon={HiOutlinePencil} onClick={handleEditClick}>
            프로필 수정
          </IconTextButton>
        </div>
      </div>

      <div css={[formStyle]}>
        <Input
          label='이름'
          value={userData ? userData.name : ''}
          placeholder='이름을 입력하세요'
          type='text'
          onChange={() => {}}
          readOnly={true}
        />
        <Input
          label='닉네임'
          value={userData ? userData.nickname : ''}
          placeholder='닉네임을 입력하세요'
          type='text'
          onChange={() => {}}
          readOnly={true}
        />
        <Input
          label='이메일'
          value={userData ? userData.email : ''}
          placeholder='이메일을 입력하세요'
          type='text'
          onChange={() => {}}
          readOnly={true}
        />
        <Input
          label='연락처'
          value={userData ? userData.phone : ''}
          placeholder='연락처를 입력하세요'
          type='text'
          onChange={() => {}}
          readOnly={true}
        />
        <Input
          label='생일'
          value={userData?.birthday ? formatDate(userData.birthday) : ''}
          placeholder='생일을 입력하세요'
          type='timestamp'
          onChange={() => {}}
          readOnly={true}
        />
        <Input
          label='부서'
          value={userData ? userData.team : ''}
          placeholder='부서를 입력하세요'
          type='text'
          onChange={() => {}}
          readOnly={true}
        />
        <Input
          label='직무'
          value={userData ? userData.position : ''}
          placeholder='직무를 입력하세요'
          type='text'
          onChange={() => {}}
          readOnly={true}
        />
        <Input
          label='입사일'
          value={userData?.hireDate ? formatDate(userData.hireDate) : ''}
          placeholder='입사일을 입력하세요'
          type='date'
          onChange={() => {}}
          readOnly={true}
        />
      </div>

      <div css={signOutButtonStyle}>
        <Button styleType='tertiary' onClick={handleLogoutClick}>
          로그아웃
        </Button>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={true}
          title='정말 로그아웃 하시겠습니까?'
          confirmText='로그아웃'
          onConfirm={handleModalLogout}
          cancelText='취소하기'
          onClose={handleModalCancel}
        />
      )}
    </div>
  );
};

const wrapperStyle = css`
  padding: 60px 3rem 3rem;
  text-align: center;
  justify-content: center;
  background-color: ${theme.colors.white};
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
  padding: 8px 16px 88px;
  button {
    background-color: transparent;

    &:hover {
      background-color: transparent;
      color: ${theme.colors.alertRed};
    }
  }
`;

export default ProfilePage;
