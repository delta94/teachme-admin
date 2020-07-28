import React, { ReactElement, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { PLAYGROUND_ROUTE } from '../../constants/routes';

import WMButton, { ButtonVariantEnum } from '../common/WMButton';
import WMDialog from '../common/WMDialog';
import Screen from '../Screen';

import Sidebar from './Sidebar';
import HeaderToolbar from './HeaderToolbar';

import classes from './style.module.scss';

export default function Layout(): ReactElement {
  const [openAbout, setOpenAbout] = useState(false);
  const openAboutDialog = () => setOpenAbout(true);
  const closeAboutDialog = () => setOpenAbout(false);
  useHotkeys('ctrl+shift+up', openAboutDialog);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <WMDialog
        title="About TeachMe"
        open={openAbout}
        onClose={closeAboutDialog}
        buttons={[
          { label: 'Ok', onClickCallback: closeAboutDialog, variant: ButtonVariantEnum.Primary },
        ]}
      >
        <p>Version: {process.env.REACT_APP_VERSION}</p>
        <p>
          <Link to={PLAYGROUND_ROUTE.path}>
            <WMButton variant={ButtonVariantEnum.Link}>Click here to get to Playground</WMButton>
          </Link>
        </p>
      </WMDialog>
      <section className={classes['app']}>
        <Sidebar />
        <HeaderToolbar />
        <Screen />
      </section>
    </Router>
  );
}
