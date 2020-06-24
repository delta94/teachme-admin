import React, { ReactElement } from 'react';

import { sidebarRoutes } from '../../../constants/routes';

import Top from './top';
import Navigation from './navigation';

import './index.less';

export default function Sidebar(): ReactElement {
  return (
    <aside className="sidebar">
      <Top />
      <Navigation routes={sidebarRoutes} />
    </aside>
  );
}
