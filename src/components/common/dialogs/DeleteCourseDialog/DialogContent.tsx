import React, { ReactElement } from 'react';

import { UICourse } from '../../../../walkme/data';

import classes from './styles.module.scss';

export default function DialogContent({ courses }: { courses: Array<UICourse> }): ReactElement {
  return (
    <p>
      {'Are you sure you want to delete '}

      {courses.length > 1 ? (
        `${courses.length} courses`
      ) : (
        <>
          <span className={classes['bold']}>{courses[0]?.title}</span>
          {' course'}
        </>
      )}

      {'?'}
    </p>
  );
}
