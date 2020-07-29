import React, { ReactElement } from 'react';

import Icon, { IconType } from '../../Icon';
import WMButton, { ButtonVariantEnum } from '../../WMButton';

export default function CreateButton({ className }: { className?: string }): ReactElement {
  return (
    <WMButton
      className={className}
      type="link"
      href="/course-editor/new"
      variant={ButtonVariantEnum.Create}
      icon={<Icon type={IconType.Plus} />}
    />
  );
}
