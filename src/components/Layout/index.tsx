import React, { ReactElement, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';

import { ButtonVariantEnum } from '../common/WMButton';
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
    <>
      <WMDialog
        title="About TeachMe"
        open={openAbout}
        onClose={closeAboutDialog}
        buttons={[
          { label: 'Ok', onClickCallback: closeAboutDialog, variant: ButtonVariantEnum.Primary },
        ]}
      >
        Version: {process.env.REACT_APP_VERSION}
      </WMDialog>
      <Router basename={process.env.PUBLIC_URL}>
        <section className={classes.app}>
          <Sidebar />
          <HeaderToolbar />
          <Screen />
        </section>
      </Router>
    </>
  );
}
