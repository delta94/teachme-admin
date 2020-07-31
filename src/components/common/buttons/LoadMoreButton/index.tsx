import React, { ReactElement } from 'react';
import cc from 'classcat';

import WMButton, { ButtonVariantEnum } from '../../WMButton';

import classes from './style.module.scss';

export default function LoadMoreButton({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}): ReactElement {
  return (
    <WMButton
      variant={ButtonVariantEnum.Secondary}
      className={cc([classes['load-more-button'], className])}
      onClick={onClick}
    >
      Load More
    </WMButton>
  );
}
