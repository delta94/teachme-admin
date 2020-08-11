import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

import WMButtonRenderer, { IWMButtonObject } from '../WMButtonRenderer';

import { ReactComponent as CloseButton } from './closeButton.svg';
import classes from './style.module.scss';

export interface IWMDialog extends ModalProps {
  open: boolean;
  title?: ReactNode;
  className?: string;
  subTitle?: ReactNode;
  children?: ReactNode;
  hideHeader?: boolean;
  buttons?: Array<IWMButtonObject>;
  onClose: (e: object) => void;
  disableCloseButton?: boolean;
}

export default function WMDialog({
  open,
  title,
  className,
  children,
  hideHeader = false,
  buttons,
  onClose,
  disableCloseButton,
  ...otherProps
}: IWMDialog): ReactElement {
  return (
    <Modal
      visible={open}
      className={cc([
        classes['wm-dialog'],
        {
          [classes['wm-dialog-no-header']]: hideHeader,
          [classes['disable-close-button']]: disableCloseButton,
        },
        className,
      ])}
      title={title}
      onCancel={onClose}
      footer={buttons ? <WMButtonRenderer buttons={buttons} /> : null}
      centered
      maskStyle={{ backgroundColor: '#0B0B0B80' }}
      style={{ maxWidth: 392 }}
      closeIcon={<CloseButton />}
      {...otherProps}
    >
      {children}
    </Modal>
  );
}
