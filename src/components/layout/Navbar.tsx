import { css } from '@emotion/react';
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineCreditCard,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

import { PATH, PATH_TITLE } from '@/constants/path';
import theme from '@/styles/theme';

const Navbar = () => {
  const menus = [
    { path: PATH.HOME, title: PATH_TITLE.HOME, Icon: HiOutlineHome },
    { path: PATH.SCHEDULE, title: PATH_TITLE.SCHEDULE, Icon: HiOutlineCalendar },
    { path: PATH.SALARY, title: PATH_TITLE.SALARY, Icon: HiOutlineCreditCard },
    { path: PATH.PROFILE, title: PATH_TITLE.PROFILE, Icon: HiOutlineUserCircle },
  ];

  return (
    <nav css={navStyle}>
      <ul css={ulStyle}>
        {menus.map(({ path, title, Icon }) => (
          <li css={liStyle} key={title}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              css={linkStyle}
            >
              <Icon css={iconStyle} />
              <span css={menuTitleStyle}>{title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const navStyle = css`
  z-index: 999;
  position: fixed;
  left: 50%;
  bottom: 0;
  height: 80px;
  width: 100vw;
  max-width: 500px;
  border-top: 1px solid ${theme.colors.borderLightGray};
  background-color: ${theme.colors.white};
  transform: translateX(-50%);
`;

const ulStyle = css`
  display: flex;
  flex-basis: 0;
`;

const liStyle = css`
  flex-grow: 1;
`;

const linkStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding-top: 10px;
  color: ${theme.colors.black};
  text-decoration: none;

  &.active {
    span {
      color: ${theme.colors.hoverPrimary};
    }

    svg {
      color: ${theme.colors.hoverPrimary};
    }
  }
`;

const iconStyle = css`
  font-size: ${theme.fontSizes.xxlarge};
`;

const menuTitleStyle = css`
  font-weight: 500;
  font-size: ${theme.fontSizes.xsmall};
`;

export default Navbar;
