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
  titleIcon,
  titleIsEllipsis,
  className,
}: {
  isOpen: boolean;
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  titleIcon?: ReactNode;
  titleIsEllipsis?: boolean;
  className?: string;
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
      className={cc([classes['details-panel'], className, { [classes['open']]: isOpen }])}
      title={
        isVisible && (
          <DetailsPanelHeader
            onClose={onClose}
            title={title}
            icon={titleIcon}
            isEllipsis={titleIsEllipsis}
          />
        )
      }
    >
      {isVisible && <div className={classes['details-panel-content']}>{children}</div>}
    </WMCard>
  );
}
