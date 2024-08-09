import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/images/logo.svg';
import Button from '@/components/common/buttons/Button';
import Input from '@/components/common/Input';
import Spinner from '@/components/common/Spinner';
import { PATH } from '@/constants/path';
import { REGEX, TEXT } from '@/constants/signIn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSignIn } from '@/store/reducer/authSlice';
import { RootState } from '@/store/store';
import theme from '@/styles/theme';
import { checkAuth } from '@/utils/auth';
import { inputValid } from '@/utils/validators';

const SignIn = () => {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInputError, setInputError] = useState(false);
  const [isInputErrorPwd, setInputErrorPwd] = useState(false);

  const [ableLogin, setAbleLogin] = useState(false);

  useEffect(() => {
    setAbleLogin(false);
  }, []);

  useEffect(() => {
    if (checkAuth()) navigate(PATH.HOME);
  }, [status]);

  useEffect(() => {
    setAbleLogin(!isInputError && !isInputErrorPwd);
  }, [isInputError, isInputErrorPwd]);

  const onChangeEmail = (value: string) => {
    setInputError(!inputValid({ value, regex: REGEX.email }));
    setEmail(value);
  };
  const onChangePassword = (value: string) => {
    setInputErrorPwd(!inputValid({ value, regex: REGEX.password }));
    setPassword(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchSignIn({ email, password }));
  };

  return (
    <div css={containerStyle}>
      <div className='signin-container'>
        <div css={logoStyle}>
          <img src={logo} alt='STUDIO T' />
        </div>
        <form onSubmit={onSubmit}>
          <Input
            value={email}
            name='email'
            placeholder={TEXT.email.placeholder}
            onChange={onChangeEmail}
            isError={isInputError}
            errorMessage={TEXT.email.regexError}
          />

          <Input
            type='password'
            name='password'
            value={password}
            placeholder={TEXT.password.placeholder}
            onChange={onChangePassword}
            isError={isInputErrorPwd}
            errorMessage={TEXT.password.regexError}
          />
          {status === 'failed' && <span css={errorStyle}>{TEXT.signin.error}</span>}
          <Button type='submit' styleType={ableLogin ? 'primary' : 'disabled'}>
            {status === 'loading' ? <Spinner /> : TEXT.signin.label}
          </Button>
        </form>
        <div css={msgStyle}>
          {TEXT.common.msg}
          <br />
          {TEXT.common.contact}
        </div>
      </div>
    </div>
  );
};

const containerStyle = css`
  max-width: 500px;
  min-height: 100vh;
  margin: 0 auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .signin-container {
    width: 100%;
    height: 100vh;
    padding: 40% 16px 0;
    background-color: ${theme.colors.white};
  }

  input {
    height: ${theme.heights.tall};
  }
`;

const logoStyle = css`
  margin-bottom: 2rem;
  text-align: center;
  line-height: 2rem;
`;

const msgStyle = css`
  margin-top: 1rem;
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.normal};
  line-height: 140%;
`;

const errorStyle = css`
  display: block;
  margin: 0.5rem 0;
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.alertRed};
`;

export default SignIn;
