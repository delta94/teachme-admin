import React, { ReactElement } from 'react';

import ScreenHeader from '../../common/ScreenHeader';

import WMTabs from '../../common/WMTabs';
import WMTabPanel from '../../common/WMTabs/WMTabPanel';
import WMCard from '../../common/WMCard';

import Dialogs from './components/Dialogs';
import Switches from './components/Switches';
import List from './components/List';

import classes from './style.module.scss';

const tabs = [
  {
    id: 'dialogs',
    title: 'Dialogs',
    icon: undefined,
    content: <Dialogs />,
  },
  {
    id: 'switches',
    title: 'Switches',
    icon: undefined,
    content: <Switches />,
  },
  {
    id: 'list',
    title: 'List',
    icon: undefined,
    content: <List />,
  },
];

export default function Playground(): ReactElement {
  return (
    <div className={classes.playground}>
      <ScreenHeader hideTimeFilter title="Playground" />
      <WMCard>
        <WMTabs defaultActiveKey={'dialogs'}>
          {tabs.map((tab) => {
            const { id, title, icon, content } = tab;
            return (
              <WMTabPanel
                tab={
                  <>
                    {!!icon && icon}
                    <span>{title}</span>
                  </>
                }
                key={id}
              >
                {content}
              </WMTabPanel>
            );
          })}
        </WMTabs>
      </WMCard>
    </div>
  );
}
