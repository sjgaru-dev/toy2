import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import { LOGIN_ASK, REGEX, REGEX_MSG } from '../constants/constant';
import { buttonProps, InputProps } from '../types/props';
import { inputValid } from '../utils/Validators';

const Login = () => {
  const [email, setEmail] = useState('');
  const [errMsgEmail, setMsgEmail] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (email.trim().length > 1)
      setMsgEmail(
        inputValid({ value: email, regex: REGEX.email }) ? REGEX_MSG.empty : REGEX_MSG.email
      );
  }, [email]);

  return (
    <div css={LoginDiv}>
      <Logo />
      <Input
        label='이메일'
        placeholder='이메일 @studiot.com'
        onChange={onChangeEmail}
        errMsg={errMsgEmail}
      />
      <Input label='비밀번호' placeholder='비밀번호' />
      <LongButton label='로그인' color='primary' />
      <div css={Ask}>
        <span>{LOGIN_ASK.msg}</span>
        <span>{LOGIN_ASK.contact}</span>
      </div>
    </div>
  );
};

/**
 * 아래 항목들은 개별 컴포넌트 완료 후 지우고 대체할 예정.
 */

// 없앨거
const LoginDiv = css`
  width: 400px;

  & div {
    width: 100%;
    padding: 10px;
  }
`;

const Logo = () => <div css={LogoDiv}>Logo</div>;

const LogoDiv = css`
  text-align: center;
`;

const Input = ({ label, placeholder, onChange, errMsg }: InputProps) => (
  <div css={InputDiv}>
    <input type='text' id={label} placeholder={placeholder} onChange={onChange} />
    <span css={ErrMsg}>{errMsg}</span>
  </div>
);

const InputDiv = css`
  display: flex;
  flex-direction: column;

  & input {
    padding: 0.5rem;
  }
`;
const ErrMsg = css`
  color: red;
`;

const LongButton = ({ label }: buttonProps) => (
  <div>
    <button css={Button}>{label}</button>
  </div>
);
const Button = css`
  width: inherit;
  line-height: 2rem;
  color: white;
  border: 0;
  background-color: green;
`;

const Ask = css`
  color: grey;
`;

export default Login;
