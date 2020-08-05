import React, { ReactElement } from 'react';
import cc from 'classcat';

import WMButton from '../../../common/WMButton';
import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';

import Icon, { IconType } from '../../../common/Icon';

import classes from './style.module.scss';

export interface IQuestionItem {
  item: QuizQuestion | any;
  index?: number;
  className?: string;
  deletable?: boolean;
  onClick: () => void;
  onDelete?: () => void;
  isValid: boolean;
}

export default function QuestionItem({
  item: { title, type },
  index,
  className,
  deletable,
  onClick,
  onDelete,
  isValid = true,
}: IQuestionItem): ReactElement {
  return (
    <div onClick={onClick} className={cc([classes['question-item'], className])} key={index}>
      <Icon type={`quiz-${type}`} className={classes['icon']} />
      {!isValid && <Icon className={classes['error-icon']} type={IconType.ValidationError} />}
      <span className={classes['title']}>{title}</span>
      {deletable && (
        <WMButton
          className={classes['delete-button']}
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete();
          }}
        >
          <Icon type={IconType.Remove} />
        </WMButton>
      )}
    </div>
  );
}
