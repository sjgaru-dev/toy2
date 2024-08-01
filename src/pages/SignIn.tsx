import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { Description, Field } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Buttons/Button';
import Input from '@/components/common/Input';
import Spinner from '@/components/common/Spinner';
import { LOADING_TYPE, REGEX, RESPONSE_STATUS_TYPE, TEXT } from '@/constants/signIn';
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
  const [isInputErrorPwd, setInputErrorPwd] = useState(false);

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

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
      <div css={logoStyle}>임시로고</div>
      <form onSubmit={onSubmit}>
        <Input
          value={email}
          placeholder={TEXT.email.placeholder}
          onChange={onChangeEmail}
          isError={isInputError}
          errorMessage={TEXT.email.regexError}
        />

        <Input
          type='password'
          value={password}
          placeholder={TEXT.password.placeholder}
          onChange={onChangePassword}
          isError={isInputErrorPwd}
          errorMessage={TEXT.password.regexError}
        />
        <div>
          {status === RESPONSE_STATUS_TYPE.error && (
            <Field>
              <Description css={errorStyle}>{TEXT.signin.error}</Description>
            </Field>
          )}
          <Button>{isLoading === LOADING_TYPE.pending ? <Spinner /> : TEXT.signin.label}</Button>
        </div>
      </form>
      <div css={msgStyle}>
        {TEXT.common.msg}
        <br />
        {TEXT.common.contact}
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

const errorStyle = css`
  display: block;
  margin-top: 0.5rem;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.alertRed};
`;

export default SignIn;
