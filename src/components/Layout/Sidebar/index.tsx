import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import { COURSES_ROUTE, COURSE_ROUTE, USERS_ROUTE } from '../../../constants/routes';
import { useAppSkeleton } from '../../../Hook';

import Logo from '../../common/Logo';
import { WMSkeletonButton } from '../../common/WMSkeleton';

import NewCourseBtn from './NewCourseButton';
import Navigation from './Navigation';

import classes from './style.module.scss';

const sidebarRoutes = [COURSES_ROUTE, COURSE_ROUTE, USERS_ROUTE];

export default function Sidebar(): ReactElement {
  const appInit = useAppSkeleton();

  return (
    <nav className={classes['sidebar']}>
      {appInit ? (
        <>
          <div>
            <Logo />
            <Divider className={classes['sidebar-separator']} />
            <Navigation routes={sidebarRoutes} />
          </div>
          <div>
            <Divider className={classes['sidebar-separator']} />
            <NewCourseBtn />
          </div>
        </>
      ) : (
        <div className={classes['sidebar-skeleton']}>
          <Logo />
          <Divider className={classes['sidebar-separator']} />
          <div className={classes['sidebar-top-skeleton']}>
            <WMSkeletonButton active size="large" shape="circle" />
            <WMSkeletonButton active size="large" shape="circle" />
          </div>
          <div>
            <WMSkeletonButton active size="large" shape="circle" />
          </div>
        </div>
      )}
    </nav>
  );
}
