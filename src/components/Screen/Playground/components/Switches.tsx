import React, { ReactElement, useState } from 'react';

import { Divider } from 'antd';
import WMSwitch from '../../../common/WMSwitch';
import classes from './playground.module.scss';

// import WMConfirmationDialog from '../../../common/WMConfirmationDialog';

export default function Dialogs(): ReactElement {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      Default
      <WMSwitch label="Normal switch" />
      <Divider />
      With infoText
      <WMSwitch label="With text below" infoText="This paragraph is shown below the switch" />
      <Divider />
      Long label (in a narrow container) and another one follows
      <div style={{ width: 220, borderRight: '1px solid #424242aa', paddingRight: 10 }}>
        <WMSwitch label="This one has a very long label, it's outrageous" />
        <WMSwitch
          label="The second switch has a shorter label"
          infoText="But its infoText is rather long, you may want to go to sleep after reading through it"
        />
      </div>
      <Divider />
      Large
      <WMSwitch label="Larger switch" size="default" />
      <Divider />
      Disabled
      <WMSwitch label="Disabled" disabled />
      <Divider />
      onChange (currently <code>{isChecked.toString()})</code>
      <WMSwitch
        label="Larger switch"
        onChange={(checked: boolean) => {
          setIsChecked(checked);
        }}
      />
      <Divider />
      Custom className
      <WMSwitch label="Purple handle" className={classes['purple-switch']} />
    </>
  );
}
