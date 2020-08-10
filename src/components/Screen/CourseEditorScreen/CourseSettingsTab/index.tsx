import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import cc from 'classcat';

import { getSegments } from '../../../../walkme/screens/build';
import { useAppContext } from '../../../../providers/AppContext';
import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';

import FormGroup from '../../../common/FormGroup';
import WMSwitch from '../../../common/WMSwitch';
import WMSelect from '../../../common/WMSelect';

import classes from './style.module.scss';

const parseSegments = (segments: any[]): { label: string; value: number }[] =>
  segments.map(({ name, id }) => ({ label: name, value: id }));

export default function CourseSettingsTab(): ReactElement {
  const [
    {
      environment: { id: envId },
    },
    appDispatch,
  ] = useAppContext();
  const [{ course }, dispatch] = useCourseEditorContext();
  const [allSegments, setAllSegments] = useState<any[]>([]);
  const [courseSegments, setCourseSegments] = useState<any[]>([]);
  const [isSegmentsUpdating, setIsSegmentsUpdating] = useState<boolean>(true);

  const getSegmentsOptions = useCallback(async () => {
    try {
      const segmentsOptions = await getSegments(envId);
      const options = parseSegments(segmentsOptions);

      setAllSegments(options);
      setIsSegmentsUpdating(false);
    } catch (error) {
      console.error(error);
      setIsSegmentsUpdating(false);
    }
  }, [envId]);

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

  const onSelectedSegments = (value: number[], option: any) => {
    const lastAdded = value[value.length - 1];

    if (lastAdded) {
      course?.segments.add(lastAdded);
      dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
    }
  };

  useEffect(() => {
    getSegmentsOptions();

    return () => {
      setAllSegments([]);
      setIsSegmentsUpdating(true);
    };
  }, [getSegmentsOptions]);

  useEffect(() => {
    if (allSegments.length) {
      const segments = course && Array.from(course?.segments);
      if (segments?.length) {
        const courseSegmentsList = segments.map((segment) =>
          allSegments.find(({ value }) => value === segment),
        );
        setCourseSegments(courseSegmentsList);
      }
    }
  }, [allSegments, course]);

  return (
    <div className={classes['course-settings-tab']}>
      {course?.properties && (
        <>
          <FormGroup
            className={cc([classes['segmentation'], classes['course-settings-form-group']])}
            title="Segmentation"
            label="Select the target audiance for the course"
            labelHtmlFor="segmentation"
          >
            <WMSelect
              id="segmentation"
              loading={isSegmentsUpdating}
              className={classes['segmentation-selection']}
              options={allSegments}
              onSelectedChange={onSelectedSegments}
              placeholder={!course?.segments.size ? 'No segments' : ''}
              value={courseSegments.length ? courseSegments.map(({ value }) => value) : undefined}
              disabled={!allSegments.length}
            />
            {!allSegments.length && (
              <sub>
                No segments have been defined in the Editor.{' '}
                <a target="_blank" href="https://support.walkme.com/knowledge-base/segmentation/">
                  Learn More
                </a>
              </sub>
            )}
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
