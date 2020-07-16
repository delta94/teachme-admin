import React, { ReactElement } from 'react';

import ScreenHeader from '../../common/ScreenHeader';

import WMTabs from '../../common/WMTabs';
import WMTabPanel from '../../common/WMTabs/WMTabPanel';
import WMCard from '../../common/WMCard';

import Dialogs from './components/Dialogs';
import Counter from './components/Counter';
import Switches from './components/Switches';
import Empty from './components/Empty';
import List from './components/List';
import Checkboxes from './components/Checkboxes';

import classes from './style.module.scss';

const tabs = [
  {
    id: 'dialogs',
    title: 'Dialogs',
    icon: undefined,
    content: <Dialogs />,
  },
  {
    id: 'counter',
    title: 'Counter',
    icon: undefined,
    content: <Counter />,
  },
  {
    id: 'switches',
    title: 'Switches',
    icon: undefined,
    content: <Switches />,
  },
  {
    id: 'empty',
    title: 'Empty',
    icon: undefined,
    content: <Empty />,
  },
  {
    id: 'list',
    title: 'List',
    icon: undefined,
    content: <List />,
  },
  {
    id: 'checkboxes',
    title: 'Checkboxes',
    icon: undefined,
    content: <Checkboxes />,
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
