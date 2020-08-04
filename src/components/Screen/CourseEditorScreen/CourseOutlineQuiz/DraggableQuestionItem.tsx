import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';
import cc from 'classcat';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';

import { QuizScreenType } from '../QuizEditForm/interface';

import DragHandle from '../../../common/DragHandle/DragHandle';
import QuestionItem from './QuestionItem';

import classes from './style.module.scss';

export interface IQuestionItem {
  item: QuizQuestion;
  index: number;
  className?: string;
  [key: string]: any;
  onClick: () => void;
  onDelete?: (index: number) => void;
  itemsAreDeletable?: boolean;
}

export default function DraggableQuestionItem({
  item,
  index,
  className,
  onClick,
  onDelete,
  itemsAreDeletable,
  ...otherProps
}: IQuestionItem): ReactElement {
  return (
    <Draggable key={index} {...otherProps}>
      <div className={cc([classes['draggable-question-item'], className])}>
        <DragHandle className={classes['question-item-drag-handle']} />
        <QuestionItem
          item={{ ...item, type: QuizScreenType.QuestionScreen }}
          key={index}
          index={index}
          onClick={onClick}
          onDelete={() => onDelete && onDelete(index)}
          deletable={itemsAreDeletable}
        />
      </div>
    </Draggable>
  );
}
