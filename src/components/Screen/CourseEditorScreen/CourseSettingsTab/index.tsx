import React, { Dispatch, ReactElement, useCallback, useEffect, useState } from 'react';
import cc from 'classcat';

import { getSegments } from '../../../../walkme/screens';
import { ActionType } from '../../../../providers/CourseEditorContext';

import FormGroup from '../../../common/FormGroup';
import WMSwitch from '../../../common/WMSwitch';
import WMSelect, { WMSelectModeType } from '../../../common/WMSelect';
import WMSkeleton from '../../../common/WMSkeleton';

import { Course } from '../../../../walkme/data/courseBuild/course';
import classes from './style.module.scss';

const parseSegments = (segments: any[]): { label: string; value: number }[] =>
  segments.map(({ name, id }) => ({ label: name, value: id }));

export default function CourseSettingsTab({
  course,
  isFetchingCourse,
  envId,
  dispatch,
}: {
  course: Course | null;
  isFetchingCourse: boolean;
  envId: number;
  dispatch: Dispatch<any>;
}): ReactElement {
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

  const onSelectSegment = (value: number, option: any) => {
    setCourseSegments([...courseSegments, option]);
    course?.segments.add(value);
    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
  };

  const onDeselectSegment = (value: number) => {
    const newSegments = [...courseSegments];
    const removalIndex = newSegments.findIndex((item) => item.value === value);
    newSegments.splice(removalIndex, 1);
    setCourseSegments(newSegments);

    course?.segments.delete(value);
    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
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
      <WMSkeleton loading={isFetchingCourse || isSegmentsUpdating} active paragraph={{ rows: 5 }}>
        {course?.properties && (
          <>
            <FormGroup
              className={cc([classes['segmentation'], classes['course-settings-form-group']])}
              title="Segmentation"
              label="Select the target audience for the course"
              labelHtmlFor="segmentation"
            >
              <WMSelect
                mode={WMSelectModeType.Multiple}
                id="segmentation"
                loading={isSegmentsUpdating}
                className={classes['segmentation-selection']}
                options={allSegments}
                optionFilterProp="label"
                onSelect={onSelectSegment}
                onDeselect={onDeselectSegment}
                placeholder={!course?.segments.size ? 'No segments' : ''}
                value={courseSegments.length ? courseSegments.map(({ value }) => value) : undefined}
                disabled={!allSegments.length && !isSegmentsUpdating}
                showArrow
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
      </WMSkeleton>
    </div>
  );
}
