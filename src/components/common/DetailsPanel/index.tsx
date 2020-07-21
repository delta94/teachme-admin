import React, { ReactElement, useState, useEffect, ReactNode } from 'react';
import cc from 'classcat';

import WMCard from '../WMCard';

import classes from './style.module.scss';
import DetailsPanelHeader from './DetailsPanelHeader';

export default function DetailsPanel({
  isOpen,
  title,
  titleIcon,
  children,
  onClose,
}: {
  isOpen: boolean;
  title: ReactNode;
  titleIcon?: ReactNode;
  children: ReactNode;
  onClose: () => void;
}): ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      // Using setTimeout to prevent rendering the content while the quiz-setting container's animation done
      timer = setTimeout(() => {
        setIsVisible(isOpen);
      }, 300);
    } else {
      setIsVisible(isOpen);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <WMCard
      className={cc([classes['details-panel'], { [classes['open']]: isOpen }])}
      title={isVisible && <DetailsPanelHeader onClose={onClose} title={title} icon={titleIcon} />}
    >
      {isVisible && <div className={classes['details-panel-content']}>{children}</div>}
    </WMCard>
  );
}
