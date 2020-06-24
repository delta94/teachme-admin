import React, { ReactElement } from 'react';

import Top from './top';
import Navigation from './navigation';

import './index.scss';

export default function Sidebar(): ReactElement {
    return (
        <aside className="sidebar">
            <Top />
            <Navigation />
        </aside>
    );
}
