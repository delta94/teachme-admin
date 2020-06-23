import React, { ReactElement } from 'react';
import cc from 'classcat';

import { coursesMockData } from '../../../constants/mocks/courses-mock';

import Header from '../../common/header';
import WMCard from '../../common/WMCard';

import screenClasses from '../style.module.css';
import classes from './style.module.css';

export default function CoursesScreen(): ReactElement {
  const {
    title: mainTitle,
    analytics: { graph_1, graph_2, graph_3 },
    CoursesTable,
  } = coursesMockData;

  return (
    <section className={screenClasses['screen']}>
      <Header className={screenClasses['screen-title']}>
        <span className={screenClasses['screen-title-text']}>{mainTitle}</span>
      </Header>
      <div className={classes.analytics}>
        <div className={cc([classes.graphs, classes['left-graphs']])}>
          <WMCard>
            <Header className={screenClasses['card-title']}>
              <span className="text">{graph_1.title}</span>
            </Header>
          </WMCard>
        </div>
        <div className={cc([classes.graphs, classes['right-graphs']])}>
          <WMCard>
            <Header className={screenClasses['card-title']}>
              <span className="text">{graph_2.title}</span>
            </Header>
          </WMCard>
          <WMCard>
            <Header className={screenClasses['card-title']}>
              <span className="text">{graph_3.title}</span>
            </Header>
          </WMCard>
        </div>
      </div>
      <WMCard>
        <Header className={screenClasses['card-title']}>
          <span className="text">{`8 ${CoursesTable.title}`}</span>
        </Header>
      </WMCard>
    </section>
  );
}
