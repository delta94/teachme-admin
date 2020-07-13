import React, { ReactElement, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import Layout from './components/Layout';
import WMDialog from './components/common/WMDialog';
import { ButtonVariantEnum } from './components/common/WMButton';

export default function App(): ReactElement {
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
      <Layout />
    </>
  );
}
