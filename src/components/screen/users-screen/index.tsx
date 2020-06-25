import React, { ReactElement } from 'react';
import Header from '../../common/header';
import WMCard from '../../common/WMCard';

import { usersMockData } from '../../../constants/mocks/users-mock';

import screenClasses from '../style.module.scss';

export default function CoursesScreen(): ReactElement {
  const { title: mainTitle, usersTable } = usersMockData;
  return (
    <section className={screenClasses['screen']}>
      <Header className={screenClasses['screen-title']}>
        <span className={screenClasses['screen-title-text']}>{mainTitle}</span>
      </Header>
      <WMCard>
        <Header className={screenClasses['card-title']}>
          <span className={screenClasses.title}>{`468 ${usersTable.title}`}</span>
        </Header>
      </WMCard>
    </section>
  );
}
