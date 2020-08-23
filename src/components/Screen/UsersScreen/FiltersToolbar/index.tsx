import React, {
  ReactElement,
  useEffect,
  useState,
  useCallback,
  SetStateAction,
  useRef,
} from 'react';
import cc from 'classcat';
import _isEqual from 'lodash/isEqual';

import { useAppContext } from '../../../../providers/AppContext';
import {
  useUsersContext,
  defaultQueryFilters,
  fetchUsers,
} from '../../../../providers/UsersContext';
import { getCoursesMetadata } from '../../../../walkme/screens/users';
import { CourseMetadata, UsersListQueryOptions } from '../../../../walkme/models';
import { UsersTableQueryFilter } from '../../../../walkme/models/users/filter';

import WMSelect, { WMSelectModeType, IWMSelectOption } from '../../../common/WMSelect';
import WMSkeleton from '../../../common/WMSkeleton';
import FormGroup from '../../../common/FormGroup';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import ControlsWrapper from '../../../common/ControlsWrapper';

import { completedOptions, resultsOptions } from '../utils';

import classes from './style.module.scss';

const parseCoursesMetadata = (courses: CourseMetadata[]): IWMSelectOption[] =>
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
  const [coursesOptions, setCoursesOptions] = useState<IWMSelectOption[]>([]);
  const [sortedCoursesOptions, setSortedCoursesOptions] = useState<IWMSelectOption[]>([]);
  const [coursesValues, setCoursesValues] = useState<number[]>([]);

  const getCoursesOptions = useCallback(async () => {
    try {
      const coursesMetadata = await getCoursesMetadata(envId);
      const options = parseCoursesMetadata(coursesMetadata);

      setCoursesOptions(options);
      setSortedCoursesOptions(options);
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

  const onBlurCourses = () => {
    // Reset to original options order when 'All' is selected
    if (coursesValues.includes(-1)) {
      setSortedCoursesOptions(coursesOptions);
      return;
    }

    const sortedOptions = [...coursesOptions];

    coursesValues.forEach((value) => {
      const option = coursesOptions.find((item) => item.value === value);

      if (option) {
        const removalIndex = sortedOptions.findIndex((item) => item.value === value);
        // Remove selected option
        sortedOptions.splice(removalIndex, 1);
        // Insert selected option as the second option (after 'All')
        sortedOptions.splice(1, 0, option);
      }
    });

    setSortedCoursesOptions(sortedOptions);
  };

  const queryFiltersRef = useRef<UsersTableQueryFilter>({ ...defaultQueryFilters });
  const queryFilters = queryFiltersRef.current;

  const onSelectCourses = (value: number) => {
    let newCoursesValues: SetStateAction<number[]> = [];

    if (value < 0) {
      // Select 'All' and deselect any specific courses
      newCoursesValues = [value];
      queryFilters.course_id = undefined;
    } else if (coursesValues.includes(-1)) {
      // Select a specific course and deselect 'All'
      newCoursesValues = [value];
      queryFilters.course_id = newCoursesValues;
    } else {
      // Select any specific course
      newCoursesValues = [...coursesValues, value];
      queryFilters.course_id = newCoursesValues;
    }

    setCoursesValues(newCoursesValues);
  };

  const onDeselectCourses = (value: number) => {
    // Can't deselect default 'All'
    if (value < 0) return;

    let newCoursesValues = [...coursesValues];
    const removalIndex = newCoursesValues.findIndex((item) => item === value);
    newCoursesValues.splice(removalIndex, 1);

    if (newCoursesValues.length) {
      queryFilters.course_id = newCoursesValues;
    } else {
      // Select default 'All' when deselecting last specific course
      newCoursesValues = [-1];
      queryFilters.course_id = undefined;
    }

    setCoursesValues(newCoursesValues);
  };

  const [completedValue, setCompletedValue] = useState<number | boolean>(-1);

  const onSelectCompleted = (value: number | boolean) => {
    if (typeof value !== 'number') {
      queryFilters.course_completed = value;
    } else {
      queryFilters.course_completed = undefined;
    }

    setCompletedValue(value);
  };

  const [resultsValue, setResultsValue] = useState<number | boolean>(-1);

  const onSelectResults = (value: number | boolean) => {
    if (typeof value !== 'number') {
      queryFilters.quiz_passed = value;
    } else {
      queryFilters.quiz_passed = undefined;
    }

    setResultsValue(value);
  };

  const [prevQueryFilters, setPrevQueryFilters] = useState({ ...queryFilters });

  const onApplyFilters = () => {
    queryOptions.course_id = queryFilters.course_id;
    queryOptions.course_completed = queryFilters.course_completed;
    queryOptions.quiz_passed = queryFilters.quiz_passed;

    fetchUsers(dispatch, envId, from, to, queryOptions);
    setPrevQueryFilters({ ...queryFilters });
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
            removeIcon={null}
            tagRender={({ label }) => (
              <span className={classes['tag']}>
                {coursesValues.length > 1 ? `${coursesValues.length} courses selected` : label}
              </span>
            )}
            optionFilterProp="label"
            options={sortedCoursesOptions}
            onBlur={onBlurCourses}
            onSelect={onSelectCourses}
            onDeselect={onDeselectCourses}
            value={coursesValues}
            loading={isFetchingOptions}
            disabled={!coursesOptions.length}
            dropdownClassName={classes['course-name-select']}
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
        <WMButton
          className={classes['apply-btn']}
          variant={ButtonVariantEnum.Primary}
          onClick={onApplyFilters}
          disabled={_isEqual(queryFilters, prevQueryFilters)}
        >
          Apply
        </WMButton>
      </WMSkeleton>
    </ControlsWrapper>
  );
}
