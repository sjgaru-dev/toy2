import { css } from '@emotion/react';

import { LOGIN_ASK } from '../constants/constant';
import { buttonProps, InputProps } from '../types/props';

const Login = () => {
  const errMsg = {
    email: '이메일 주소가 올바르지 않습니다.',
    pwd: '비밀번호는 최소 8자 이상이어야 합니다.',
  };

  return (
    <div css={LoginDiv}>
      <Logo />
      <Input label='이메일' placeholder='이메일' errMsg={errMsg.email} />
      <Input label='비밀번호' placeholder='비밀번호' errMsg={errMsg.pwd} />
      <LongButton label='로그인' color='primary' />
      <div css={Ask}>
        <span>{LOGIN_ASK.msg}</span>
        <span>{LOGIN_ASK.contact}</span>
      </div>
    </div>
  );
};

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

const Input = ({ label, placeholder, errMsg }: InputProps) => (
  <div css={InputDiv}>
    <input type='text' id={label} placeholder={placeholder} />
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

const ButtonDiv = css`
  width: 100%;
  border: 0;
  padding: 10px;
`;

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
