import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';
import { Modal } from 'antd';
import { CardProps } from 'antd/lib/card';

import WMButtonRenderer, { IWMButtonObject } from '../WMButtonRenderer';

import { ReactComponent as CloseButton } from './closeButton.svg';
import classes from './style.module.scss';

export interface IWMCardProps extends CardProps {
  open: boolean;
  title?: ReactNode;
  className?: string;
  subTitle?: ReactNode;
  children?: ReactNode;
  hideHeader?: boolean;
  buttons?: Array<IWMButtonObject>;
  onClose: (e: object) => void;
}

export default function WMDialog({
  open,
  title,
  className,
  children,
  hideHeader = false,
  buttons,
  onClose,
  ...otherProps
}: IWMCardProps): ReactElement {
  return (
    <Modal
      visible={open}
      className={cc([
        classes['wm-dialog'],
        { [classes['wm-dialog-no-header']]: hideHeader },
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
