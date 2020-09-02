import React, { Dispatch, ReactElement, useCallback, useMemo } from 'react';

import { ActionType } from '../../../providers/CourseContext';

import WMTable, { WMTableExpanded } from '../../common/WMTable';
import ControlsWrapper from '../../common/ControlsWrapper';
import { SearchFilter } from '../../common/filters';

import { CourseMetadata } from '../../../walkme/models/course';
import ExportCoursesButton from './ExportCourseButton';
import { getColumns } from './tableData';
import { getFilteredCourseOutline } from './utils';
import { ICourseOutline, ICourseOutlineItems } from './courseScreen.interface';

import classes from './style.module.scss';

interface ICourseOutlineTableProps {
  isFetchingCourseData: boolean;
  courseOutline: ICourseOutline;
  filteredCourseOutline: ICourseOutlineItems;
  courseOutlineSearchValue: string;
  isUpdating: boolean;
  courseMetadata?: CourseMetadata;
  isExportingCourse: boolean;
  envId: number;
  from: string;
  to: string;
  dispatch: Dispatch<any>;
}

function CourseOutlineTable({
  isFetchingCourseData,
  courseOutline,
  filteredCourseOutline,
  courseOutlineSearchValue,
  isUpdating,
  courseMetadata,
  isExportingCourse,
  envId,
  from,
  to,
  dispatch,
}: ICourseOutlineTableProps): ReactElement {
  const hasItems = courseOutline?.items?.length ?? 0;
  const disableActions = isUpdating || isFetchingCourseData || !hasItems;

  const onSearch = useCallback(
    (searchValue: string) => {
      const filtered = getFilteredCourseOutline(courseOutline.items, searchValue);

      dispatch({
        type: ActionType.SetCourseOutlineSearchValue,
        courseOutlineSearchValue: searchValue,
        filteredCourseOutline: filtered,
      });
    },
    [courseOutline.items, dispatch],
  );

  const columns = useMemo(() => getColumns(courseOutline?.dropOffEnabled), [
    courseOutline?.dropOffEnabled,
  ]);

  const getRecordClassName = useCallback((record) => record.className, []);

  return (
    <div className={classes['course-outline-table']}>
      <ControlsWrapper className={classes['course-table-toolbar']}>
        <ExportCoursesButton
          disabled={disableActions}
          courseMetadata={courseMetadata}
          isExportingCourse={isExportingCourse}
          envId={envId}
          from={from}
          to={to}
          dispatch={dispatch}
        />
        <SearchFilter
          className={classes['search']}
          placeholder="Search item name"
          onSearch={onSearch}
          value={courseOutlineSearchValue}
          disabled={disableActions}
        />
      </ControlsWrapper>
      {filteredCourseOutline.length ? (
        // Using WMTableExpanded as a new instance of WMTable to expand all rows initially
        <WMTableExpanded
          loading={isUpdating || isFetchingCourseData}
          data={filteredCourseOutline}
          columns={columns}
          rowClassName={getRecordClassName}
          className={classes['course-table']}
        />
      ) : (
        <WMTable
          loading={isUpdating || isFetchingCourseData}
          data={[]}
          columns={columns}
          className={classes['course-table']}
        />
      )}
    </div>
  );
}

export default React.memo(CourseOutlineTable);
