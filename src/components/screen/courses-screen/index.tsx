import React, { ReactElement } from 'react';
import cc from 'classcat';

import Header from '../../common/header';
import WMCard from '../../common/WMCard';

import classes from './style.module.css';

export default function CoursesScreen(): ReactElement {
  return (
    <section className={classes['courses-screen']}>
      <Header className={classes['courses-title']}>
        <span className={classes['courses-title-text']}>Courses</span>
      </Header>
      <div className={classes.analytics}>
        <div className={cc([classes.graphs, classes['left-graphs']])}>
          <WMCard>
            <Header className={classes['WMCard-title']}>
              <span className="text">Users Started / Completed Courses</span>
            </Header>
          </WMCard>
        </div>
        <div className={cc([classes.graphs, classes['right-graphs']])}>
          <WMCard>
            <Header className={classes['WMCard-title']}>
              <span className="text">Avg. Completion Time</span>
            </Header>
          </WMCard>
          <WMCard>
            <Header className={classes['WMCard-title']}>
              <span className="text">Quiz Completion Rate</span>
            </Header>
          </WMCard>
        </div>
      </div>
      <div className={classes['courses-table']}>
        <WMCard>
          <Header className={classes['WMCard-title']}>
            <span className="text">8 courses</span>
          </Header>
        </WMCard>
      </div>
    </section>
  );
}
