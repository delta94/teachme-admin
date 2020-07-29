import React, { ReactElement } from 'react';
import cc from 'classcat';

import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';

import FormGroup from '../../../common/FormGroup';
import WMSwitch from '../../../common/WMSwitch';

import classes from './style.module.scss';

export default function CourseSettingsTab(): ReactElement {
  const [{ course }, dispatch] = useCourseEditorContext();

  const updateEnableIfPreviousDone = (checked: boolean) => {
    if (course?.properties) {
      course.properties.enableIfPreviousDone = checked;
      dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
    }
  };

  const updateEnforceOrder = (checked: boolean) => {
    if (course?.properties) {
      course.properties.enforceOrder = checked;
      dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
    }
  };

  return (
    <div className={classes['course-settings-tab']}>
      {course?.properties && (
        <>
          <FormGroup
            className={cc([classes['segmentation'], classes['course-settings-form-group']])}
            title="Segmentation"
          >
            {/* drodown */}
            <sub>No segments have been defined in the Editor. Learn More </sub>
          </FormGroup>
          <FormGroup
            className={cc([classes['learning-path'], classes['course-settings-form-group']])}
            title="Learning Path"
          >
            <WMSwitch
              className={classes['switch-field']}
              checked={course?.properties.enableIfPreviousDone}
              label="Allow users to take the course only when previous one is completed"
              onChange={(checked: boolean) => updateEnableIfPreviousDone(checked)}
            />
            <WMSwitch
              className={classes['switch-field']}
              checked={course?.properties.enforceOrder}
              label="Enforce order for course outline"
              onChange={(checked: boolean) => updateEnforceOrder(checked)}
            />
          </FormGroup>
        </>
      )}
    </div>
  );
}
