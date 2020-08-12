import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import cc from 'classcat';

import { useAppContext } from '../../../../providers/AppContext';
import { useUsersContext } from '../../../../providers/UsersContext';
import { getCoursesMetadata } from '../../../../walkme/screens/users';
import { CourseMetadata, UsersListQueryOptions } from '../../../../walkme/models';

import WMSelect, { WMSelectModeType } from '../../../common/WMSelect';
import WMSkeleton from '../../../common/WMSkeleton';
import FormGroup from '../../../common/FormGroup';
import ControlsWrapper from '../../../common/ControlsWrapper';

import { statusesOptions, resultsOptions } from '../utils';

import classes from './style.module.scss';

const parseCoursesMetadata = (courses: CourseMetadata[]): { label: string; value: string }[] =>
  [{ label: 'All', value: 'All' }].concat(
    courses.map(({ title }) => ({ label: title, value: title })),
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
  } = appState;
  const [{ isFetchingUsers }, dispatch] = useUsersContext();
  const [coursesOptions, setCoursesOptions] = useState<any[]>([]);
  const [isFetchingOptions, setIsFetchingOptions] = useState<boolean>(true);

  const getCoursesOptions = useCallback(async () => {
    try {
      const coursesMetadata = await getCoursesMetadata(envId);
      const options = parseCoursesMetadata(coursesMetadata);

      setCoursesOptions(options);
      setIsFetchingOptions(false);
    } catch (error) {
      console.error(error);
      setIsFetchingOptions(false);
    }
  }, [envId]);

  useEffect(() => {
    getCoursesOptions();

    return () => {
      setCoursesOptions([]);
      setIsFetchingOptions(true);
    };
  }, [getCoursesOptions]);

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
            defaultValue="All"
            options={coursesOptions}
            loading={isFetchingOptions}
            disabled={!coursesOptions.length}
          />
        </FormGroup>
        <FormGroup className={classes['filter-wrapper']} label="Completed:">
          <WMSelect
            className={classes['select-filter']}
            optionFilterProp="label"
            defaultValue={statusesOptions[0].value}
            options={statusesOptions}
          />
        </FormGroup>
        <FormGroup className={classes['filter-wrapper']} label="Quiz Results:">
          <WMSelect
            className={classes['select-filter']}
            optionFilterProp="label"
            defaultValue={resultsOptions[0].value}
            options={resultsOptions}
          />
        </FormGroup>
      </WMSkeleton>
    </ControlsWrapper>
  );
}
