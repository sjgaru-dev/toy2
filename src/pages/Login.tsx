import { FormEvent, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { login } from '../api/User';
import { LOGIN_ASK, REGEX, REGEX_MSG } from '../constants/constant';
import { ButtonProps, InputProps } from '../types/props';
import { inputValid } from '../utils/Validators';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsgEmail, setMsgEmail] = useState('');
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await login({ email, password });
    if (result) navigate('/');
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
      <form onSubmit={onSubmit}>
        <Input
          type='text'
          label='이메일'
          name='email'
          placeholder='이메일 @studiot.com'
          onChange={onChange}
          errMsg={errMsgEmail}
        />
        <Input
          type='password'
          label='비밀번호'
          name='password'
          placeholder='비밀번호'
          onChange={onChange}
        />
        <LongButton label='로그인' color='primary' />
      </form>
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

const Input = (props: InputProps) => (
  <div css={InputDiv}>
    <input
      type={props.type}
      id={props.label}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
    <span css={ErrMsg}>{props.errMsg}</span>
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

const LongButton = (props: ButtonProps) => (
  <div>
    <button type='submit' css={Button} onClick={props.onClick}>
      {props.label}
    </button>
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
