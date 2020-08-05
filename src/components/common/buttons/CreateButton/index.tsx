import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { NEW_COURSE_EDITOR_ROUTE } from '../../../../constants/routes';

import Icon, { IconType } from '../../Icon';
import WMButton, { ButtonVariantEnum } from '../../WMButton';

export default function CreateButton({ className }: { className?: string }): ReactElement {
  return (
    <Link to={NEW_COURSE_EDITOR_ROUTE.path}>
      <WMButton
        className={className}
        type="link"
        href="/course-editor/new"
        variant={ButtonVariantEnum.Create}
        icon={<Icon type={IconType.Plus} />}
      />
    </Link>
  );
}
