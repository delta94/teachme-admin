import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';

import { ModalProps } from 'antd/es/modal/Modal';
import WMDialog from '../WMDialog';
import { IWMButtonObject } from '../WMButtonRenderer';
import { ButtonVariantEnum } from '../WMButton';

import classes from './style.module.scss';

export interface IWMConfirmationDialogWrapper {
  open?: boolean;
  onCancel: () => void;
  onConfirm: (data?: any) => void;
}

export interface IWMConfirmationDialog extends ModalProps {
  open?: boolean;
  title?: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmClass?: string;
  disableConfirmButton?: boolean;
  loadingConfirmButton?: boolean;
  onCancel: () => void;
  onConfirm: (data?: any) => void;
  className?: string;
  disableDialog?: boolean;
  children?: ReactNode;
}

export default function WMConfirmationDialog({
  open = false,
  title,
  cancelLabel,
  confirmLabel,
  confirmClass,
  disableConfirmButton,
  loadingConfirmButton,
  onCancel,
  onConfirm,
  className,
  disableDialog,
  children,
  ...otherProps
}: IWMConfirmationDialog): ReactElement {
  const cancelConfirmButtons: Array<IWMButtonObject> = [
    {
      label: cancelLabel ?? 'Cancel',
      onClickCallback: onCancel,
      shape: 'round',
      variant: ButtonVariantEnum.Secondary,
      disabled: disableDialog,
    },
    {
      label: confirmLabel ?? 'Ok',
      onClickCallback: onConfirm,
      shape: 'round',
      variant: ButtonVariantEnum.Primary,
      disabled: disableConfirmButton || (disableDialog && !loadingConfirmButton),
      className: confirmClass,
      loading: loadingConfirmButton,
    },
  ];

  return (
    <WMDialog
      open={open}
      title={title}
      buttons={cancelConfirmButtons}
      className={cc([
        classes['wm-confirmation-dialog'],
        { [classes['no-interaction-indicator']]: disableDialog },
        className,
      ])}
      onClose={onCancel}
      disableCloseButton={disableDialog} // prevent clicking 'x' button
      maskClosable={!disableDialog} // prevent click outside
      keyboard={!disableDialog} // prevent pressing 'esc'
      {...otherProps}
    >
      {children}
    </WMDialog>
  );
}
