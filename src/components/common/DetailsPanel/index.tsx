import React, { ReactElement, useState, useEffect, ReactNode } from 'react';
import cc from 'classcat';

import WMCard from '../WMCard';

import classes from './style.module.scss';
import DetailsPanelHeader from './DetailsPanelHeader';

export default function DetailsPanel({
  isOpen,
  title,
  children,
  onClose,
}: {
  isOpen: boolean;
  title: ReactElement;
  children: ReactNode;
  onClose: () => void;
}): ReactElement {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      // Using setTimeout to prevent rendering the content while the quiz-setting container's animation done
      timer = setTimeout(() => {
        setShowContent(isOpen);
      }, 300);
    } else {
      setShowContent(isOpen);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <WMCard
      className={cc([classes['details-panel'], { [classes['open']]: isOpen }])}
      title={<DetailsPanelHeader onClose={onClose} title={title} />}
    >
      {showContent && children}
    </WMCard>
  );
}
