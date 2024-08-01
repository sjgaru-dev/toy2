import { useState } from 'react';

import Input from '@/components/common/Input';

const ProfilePage = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div style={{ padding: '100px 100px' }}>
      <Input
        label='이름'
        value={inputValue}
        placeholder='이름을 입력하세요'
        onChange={handleInputChange}
        type='text'
      />
      <Input
        label='비밀번호'
        value={inputValue}
        placeholder='CEO'
        onChange={handleInputChange}
        type='password'
        readOnly={true}
      />
    </div>
  );
};

export default ProfilePage;
