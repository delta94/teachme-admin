import React, { ReactElement, useEffect, useState, useCallback, SetStateAction } from 'react';
import cc from 'classcat';

import { useAppContext } from '../../../../providers/AppContext';
import { useUsersContext, fetchUsers } from '../../../../providers/UsersContext';
import { getCoursesMetadata } from '../../../../walkme/screens/users';
import { CourseMetadata, UsersListQueryOptions } from '../../../../walkme/models';

import WMSelect, { WMSelectModeType } from '../../../common/WMSelect';
import WMSkeleton from '../../../common/WMSkeleton';
import FormGroup from '../../../common/FormGroup';
import ControlsWrapper from '../../../common/ControlsWrapper';

import { completedOptions, resultsOptions } from '../utils';

import classes from './style.module.scss';

const parseCoursesMetadata = (courses: CourseMetadata[]): { label: string; value: number }[] =>
  [{ label: 'All', value: -1 }].concat(
    courses.map(({ title, id }) => ({ label: title, value: id })),
  );

export default function FiltersToolbar({
  queryOptions,
}: {
  queryOptions: UsersListQueryOptions;
}): ReactElement {
  const [appState] = useAppContext();
  const {
    isUpdating,
    environment: { id: envId },
    dateRange: { from, to },
  } = appState;
  const [{ isFetchingUsers }, dispatch] = useUsersContext();
  const [isFetchingOptions, setIsFetchingOptions] = useState<boolean>(true);
  const [coursesOptions, setCoursesOptions] = useState<any[]>([]);
  const [coursesValues, setCoursesValues] = useState<number[]>([]);

  const getCoursesOptions = useCallback(async () => {
    try {
      const coursesMetadata = await getCoursesMetadata(envId);
      const options = parseCoursesMetadata(coursesMetadata);

      setCoursesOptions(options);
      setCoursesValues([options[0].value]);
      setIsFetchingOptions(false);
    } catch (error) {
      console.error(error);
      setIsFetchingOptions(false);
    }
  }, [envId]);

  useEffect(() => {
    if (!isUpdating) getCoursesOptions();

    return () => {
      setCoursesOptions([]);
      setIsFetchingOptions(true);
    };
  }, [isUpdating, getCoursesOptions]);

  const onSelectCourses = (value: number) => {
    let newCoursesValues: SetStateAction<number[]> = [];

    if (value < 0) {
      // Select 'All' and deselect any specific courses
      newCoursesValues = [value];
      queryOptions.course_id = undefined;
    } else if (coursesValues.includes(-1)) {
      // Select a specific course and deselect 'All'
      newCoursesValues = [value];
      queryOptions.course_id = newCoursesValues;
    } else {
      // Select any specific course
      newCoursesValues = [...coursesValues, value];
      queryOptions.course_id = newCoursesValues;
    }

    setCoursesValues(newCoursesValues);
    fetchUsers(dispatch, envId, from, to, queryOptions);
  };

  const onDeselectCourses = (value: number) => {
    // Can't deselect default 'All'
    if (value < 0) return;

    const newCoursesValues = [...coursesValues];
    const removalIndex = newCoursesValues.findIndex((item) => item === value);
    newCoursesValues.splice(removalIndex, 1);
    queryOptions.course_id = newCoursesValues;

    setCoursesValues(newCoursesValues);
    fetchUsers(dispatch, envId, from, to, queryOptions);
  };

  const [completedValue, setCompletedValue] = useState<number | boolean>(-1);

  const onSelectCompleted = (value: number | boolean) => {
    if (typeof value !== 'number') {
      queryOptions.course_completed = value;
    } else {
      queryOptions.course_completed = undefined;
    }

    setCompletedValue(value);
    fetchUsers(dispatch, envId, from, to, queryOptions);
  };

  const [resultsValue, setResultsValue] = useState<number | boolean>(-1);

  const onSelectResults = (value: number | boolean) => {
    if (typeof value !== 'number') {
      queryOptions.quiz_passed = value;
    } else {
      queryOptions.quiz_passed = undefined;
    }

    setResultsValue(value);
    fetchUsers(dispatch, envId, from, to, queryOptions);
  };

  return (
    <ControlsWrapper className={classes['filters-toolbar']}>
      <WMSkeleton
        loading={isUpdating || isFetchingUsers}
        active
        title={false}
        paragraph={{ rows: 1 }}
      >
        <FormGroup className={classes['filter-wrapper']} label="Course Name:">
          <WMSelect
            className={cc([classes['select-filter'], classes['multi']])}
            mode={WMSelectModeType.Multiple}
            showArrow
            optionFilterProp="label"
            options={coursesOptions}
            onSelect={onSelectCourses}
            onDeselect={onDeselectCourses}
            value={coursesValues}
            loading={isFetchingOptions}
            disabled={!coursesOptions.length}
          />
        </FormGroup>
        <FormGroup className={classes['filter-wrapper']} label="Completed:">
          <WMSelect
            className={classes['select-filter']}
            optionFilterProp="label"
            defaultValue={completedOptions[0].value}
            options={completedOptions}
            onSelect={onSelectCompleted}
            value={completedValue}
          />
        </FormGroup>
        <FormGroup className={classes['filter-wrapper']} label="Quiz Results:">
          <WMSelect
            className={classes['select-filter']}
            optionFilterProp="label"
            defaultValue={resultsOptions[0].value}
            options={resultsOptions}
            onSelect={onSelectResults}
            value={resultsValue}
          />
        </FormGroup>
      </WMSkeleton>
    </ControlsWrapper>
  );
}
