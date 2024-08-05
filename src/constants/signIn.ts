export const REGEX = {
  email: new RegExp(/^[\w.%+-]+@(studiot\.com|gmail\.com)$/i),
  password: new RegExp(/^[A-Za-z\d@$!%*?&]{8,}$/),
};

export const TEXT = {
  email: {
    label: '이메일',
    placeholder: '이메일 @studiot.com',
    regexError: '이메일 주소가 올바르지 않습니다.',
  },
  password: {
    label: '비밀번호',
    placeholder: '비밀번호',
    regexError: '비밀번호는 최소 8자 이상이어야 합니다.',
  },
  common: {
    msg: '비밀번호를 잊어버리셨다면, IT지원팀으로 문의해 주세요.',
    contact: 'IT 지원팀 연락처: studiot.it@studiot.com',
  },
  signin: {
    label: '로그인',
    error: '이메일 또는 비밀번호를 잘못 입력했습니다.',
  },
};

export const LOADING_TYPE = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
};

export const RESPONSE_STATUS_TYPE = {
  idle: 'idle',
  success: 'success',
  error: 'error',
};
