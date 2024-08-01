import React from 'react';

import { css } from '@emotion/react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import theme from '@/styles/theme';

interface TabsProps {
  tabs: string[];
  children: React.ReactNode[];
}

const Tabs: React.FC<TabsProps> = ({ tabs, children }) => (
  <TabGroup>
    <TabList css={tabListStyle}>
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
  background-color: ${theme.colors.white};
`;

const tabStyle = css`
  flex: 1;
  padding: 32px 0 0 0;
  font-size: ${theme.fontSizes.large};
  background: transparent;
  border: 0;
  cursor: pointer;
  outline: none;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const tabContainerStyle = (selected: boolean) => css`
  width: fit-content;
  position: relative;
  display: flex;
  margin: 0 2rem;
  padding-bottom: 8px;
  border-bottom: ${selected
    ? `3px solid ${theme.colors.primary}`
    : `1px solid ${theme.colors.borderLightGray}`};
`;

const tabTextStyle = (selected: boolean) => css`
  color: ${selected ? theme.colors.black : theme.colors.black};
  font-weight: ${selected ? 'bold' : 'normal'};
`;

export default Tabs;
