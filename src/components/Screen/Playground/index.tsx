import React, { ReactElement } from 'react';

import ScreenHeader from '../../common/ScreenHeader';

import WMTabs from '../../common/WMTabs';
import WMTabPanel from '../../common/WMTabs/WMTabPanel';
import WMCard from '../../common/WMCard';

import Dialogs from './components/Dialogs';
import Counter from './components/Counter';
import Switches from './components/Switches';
import List from './components/List';
import Checkboxes from './components/Checkboxes';
import QuizSettings from './components/QuizSettings';
import CourseItemDetailsPanel from './components/CourseItemDetailsPanel';
import QuizEdit from './components/QuizEdit';

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
  {
    id: 'course-item-details-panel',
    title: 'Course Item Details Panel',
    icon: undefined,
    content: <CourseItemDetailsPanel />,
  },
  {
    id: 'quiz-settings',
    title: 'Quiz Settings',
    icon: undefined,
    content: <QuizSettings />,
  },
  {
    id: 'quiz-edit',
    title: 'Quiz Edit',
    icon: undefined,
    content: <QuizEdit />,
  },
];

export default function Playground(): ReactElement {
  const defaultTabId = 'dialogs';

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
