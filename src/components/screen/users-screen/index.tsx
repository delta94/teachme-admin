import React, { ReactElement } from 'react';
import Header from '../../common/header';
import WMCard from '../../common/WMCard';

import { usersMockData } from '../../../constants/mocks/users-mock';

export default function CoursesScreen(): ReactElement {
  const { title: mainTitle, usersTable } = usersMockData;
  return (
    <section className="screen">
      <Header className="screen-title">
        <span className="screen-title-text">{mainTitle}</span>
      </Header>
      <WMCard>
        <Header className="wm-card-title">
          <span className="text">{`468 ${usersTable.title}`}</span>
        </Header>
      </WMCard>
    </section>
  );
}
