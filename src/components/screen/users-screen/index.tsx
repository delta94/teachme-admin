import React, { ReactElement } from 'react';
import WMCard from '../../common/WMCard';

import { usersMockData } from '../../../constants/mocks/users-mock';
import ScreenHeader from '../../common/screenHeader';

import screenClasses from '../style.module.scss';

export default function CoursesScreen(): ReactElement {
  const { title: mainTitle, usersTable } = usersMockData;
  return (
    <section className={screenClasses['screen']}>
      <ScreenHeader title={mainTitle} />
      <WMCard title={`468 ${usersTable.title}`} />
    </section>
  );
}
