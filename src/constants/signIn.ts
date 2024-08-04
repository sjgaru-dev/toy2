export const LOGIN_ASK = {
  msg: '비밀번호를 잊어버리셨다면, IT지원팀으로 문의해 주세요.',
  contact: 'IT 지원팀 연락처: studiot.it@studiot.com',
};

export const REGEX = {
  email: new RegExp(/^[\w.%+-]+@(studiot\.com|gmail\.com)$/i),
};

export const ERROR_MSG = {
  regex: {
    email: '이메일 주소가 올바르지 않습니다.',
    pwd: '비밀번호는 최소 8자 이상이어야 합니다.',
  },
  signIn: '이메일 또는 비밀번호를 잘못 입력했습니다.',
};
