import React from 'react';

import { css } from '@emotion/react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import theme from '@/styles/theme';

interface TabsProps {
  tabs: string[];
  children: React.ReactNode[];
  activeTab?: number;
  // eslint-disable-next-line no-unused-vars
  onTabChange?: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, children, activeTab, onTabChange }) => (
  <TabGroup selectedIndex={activeTab} onChange={onTabChange}>
    <TabList css={tabListStyle} className='wrapper'>
      {tabs.map((tab) => (
        <Tab key={tab} css={tabStyle}>
          {({ selected }) => (
            <div css={tabContainerStyle(selected)}>
              <span css={tabTextStyle(selected)}>{tab}</span>
            </div>
          )}
        </Tab>
      ))}
    </TabList>
    <TabPanels>
      {children.map((child, index) => (
        <TabPanel key={index}>{child}</TabPanel>
      ))}
    </TabPanels>
  </TabGroup>
);

const tabListStyle = css`
  display: flex;
  gap: 28px;
  background-color: ${theme.colors.white};
`;

const tabStyle = css`
  border: 0;
  outline: none;
  font-size: ${theme.fontSizes.large};
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const tabContainerStyle = (selected: boolean) => css`
  width: fit-content;
  position: relative;
  display: flex;
  padding-bottom: 12px;
  border-bottom: ${`4px solid ${selected ? theme.colors.primary : theme.colors.white}`};
`;

const tabTextStyle = (selected: boolean) => css`
  color: ${selected ? theme.colors.black : theme.colors.darkGray};
  font-weight: bold;
`;

export default Tabs;
