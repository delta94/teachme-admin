import React, { ReactElement } from 'react';

import ScreenHeader from '../../common/ScreenHeader';
import WMTabs from '../../common/WMTabs';
import WMTabPanel from '../../common/WMTabs/WMTabPanel';
import WMCard from '../../common/WMCard';

import Dialogs from './components/Dialogs';
import Counter from './components/Counter';
import Switches from './components/Switches';
import Empty from './components/Empty';
import Checkboxes from './components/Checkboxes';
import Toaster from './components/Toaster';
import Skeleton from './components/Skeleton';

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
    id: 'checkboxes',
    title: 'Checkboxes',
    icon: undefined,
    content: <Checkboxes />,
  },
  {
    id: 'toaster',
    title: 'Toaster',
    icon: undefined,
    content: <Toaster />,
  },
  {
    id: 'skeleton',
    title: 'Skeleton',
    icon: undefined,
    content: <Skeleton />,
  },
];

export default function Playground(): ReactElement {
  const defaultTabId = 'quiz-edit'; //'dialogs';

  return (
    <div className={classes.playground}>
      <ScreenHeader hideTimeFilter title="Playground" />
      <WMCard>
        <WMTabs defaultActiveKey={defaultTabId}>
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
