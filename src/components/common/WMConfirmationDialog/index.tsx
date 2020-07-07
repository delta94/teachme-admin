import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';
import { CardProps } from 'antd/lib/card';

import WMDialog from '../WMDialog';
import { IWMButtonObject } from '../WMButtonRenderer';
import { ButtonVariantEnum } from '../WMButton';

import classes from './style.module.scss';

export interface IWMConfirmationDialogWrapper {
  open?: boolean;
  onCancel: () => void;
  onConfirm: (data?: any) => void;
}

export interface IWMConfirmationDialog {
  open?: boolean;
  title?: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: (data?: any) => void;
  className?: string;
  children?: ReactNode;
}

export default function WMConfirmationDialog({
  open = false,
  title,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  className,
  children,
  ...otherProps
}: IWMConfirmationDialog): ReactElement {
  const cancelConfirmButtons: Array<IWMButtonObject> = [
    {
      label: cancelLabel ?? 'Cancel',
      onClickCallback: onCancel,
      shape: 'round',
      variant: ButtonVariantEnum.Secondary,
    },
    {
      label: confirmLabel ?? 'Ok',
      onClickCallback: onConfirm,
      shape: 'round',
      variant: ButtonVariantEnum.Primary,
    },
  ];

  return (
    <WMDialog
      open={open}
      title={title}
      buttons={cancelConfirmButtons}
      className={cc([classes['wm-confirmation-dialog'], className])}
      onClose={onCancel}
      {...otherProps}
    >
      {children}
    </WMDialog>
  );
}
