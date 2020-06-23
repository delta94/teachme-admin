import React, { ReactElement } from 'react';
import Header from '../../common/header';
import WMCard from '../../common/WMCard';

import screenClasses from '../style.module.css';
import { usersMockData } from '../../../constants/mocks/users-mock';

export default function CoursesScreen(): ReactElement {
  const { title: mainTitle, usersTable } = usersMockData;
  return (
    <section className={screenClasses['screen']}>
      <Header className={screenClasses['screen-title']}>
        <span className={screenClasses['screen-title-text']}>{mainTitle}</span>
      </Header>
      <WMCard>
        <Header className={screenClasses['card-title']}>
          <span className="text">{`468 ${usersTable.title}`}</span>
        </Header>
      </WMCard>
    </section>
  );
}
