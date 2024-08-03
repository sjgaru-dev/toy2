import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/buttons/Button';
import Input from '@/components/common/Input';
import Spinner from '@/components/common/Spinner';
import { ERROR_MSG, LOGIN_ASK, REGEX } from '@/constants/signIn';
import { fetchSignIn } from '@/store/reducer/authSlice';
import { AppDispatch, RootState } from '@/store/store';
import theme from '@/styles/theme';
import { inputValid } from '@/utils/Validators';

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isAuth } = useSelector((state: RootState) => state.auth);
  const { status } = useSelector((state: RootState) => state.auth.apiResult);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInputError, setInputError] = useState(false);

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  const onChangeEmail = (value: string) => {
    setInputError(!inputValid({ value, regex: REGEX.email }));
    setEmail(value);
  };
  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchSignIn({ email, password }));
  };

  return (
    <div css={containerStyle}>
      <div css={logoStyle}>임시로고</div>
      <form onSubmit={onSubmit}>
        <Input
          label='이메일'
          value={email}
          placeholder='이메일@studiot.com'
          onChange={onChangeEmail}
          isError={isInputError}
          errorMessage={ERROR_MSG.regex.email}
        />

        <Input
          label='비밀번호'
          type='password'
          value={password}
          placeholder='비밀번호'
          onChange={onChangePassword}
          isError={status === 'error'}
          errorMessage={ERROR_MSG.signIn}
        />
        <div>
          <Button>{isLoading === 'pending' ? <Spinner /> : '로그인'}</Button>
        </div>
      </form>
      <div css={msgStyle}>
        {LOGIN_ASK.msg}
        <br />
        {LOGIN_ASK.contact}
      </div>
    </div>
  );
};

const containerStyle = css`
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  align-content: center;
`;

const logoStyle = css`
  text-align: center;
  line-height: 2rem;
`;

const msgStyle = css`
  margin-top: 1rem;
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.normal};
`;

export default SignIn;
