import { css } from '@emotion/react';

const Input = () => {
  const input = [
    {
      type: 'label',
      placeholder: 'label',
    },
    {
      type: 'text',
      placeholder: 'text',
    },
  ];

  return (
    <div css={navStyle}>
      {input.map((item, index) => (
        <input key={index} type={item.type} placeholder={item.placeholder} />
      ))}
    </div>
  );
};

const navStyle = css`
  display: flex;
`;

export default Input;
