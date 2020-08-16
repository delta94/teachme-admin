import React, { ReactElement } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { useCourseContext, ActionType } from '../../../providers/CourseContext';

import WMTable, { WMTableExpanded } from '../../common/WMTable';
import ControlsWrapper from '../../common/ControlsWrapper';
import { SearchFilter } from '../../common/filters';

import ExportCoursesButton from './ExportCourseButton';
import { getColumns } from './tableData';
import { getFilteredCourseOutline } from './utils';

import classes from './style.module.scss';

export default function CourseOutlineTable(): ReactElement {
  const [{ isUpdating }] = useAppContext();
  const [state, dispatch] = useCourseContext();
  const {
    isFetchingCourseData,
    courseOutline,
    filteredCourseOutline,
    courseOutlineSearchValue,
  } = state;
  const hasItems = courseOutline?.items?.length ?? 0;
  const disableActions = isUpdating || isFetchingCourseData || !hasItems;

  const onSearch = (searchValue: string) => {
    const filtered = getFilteredCourseOutline(courseOutline.items, searchValue);

    dispatch({
      type: ActionType.SetCourseOutlineSearchValue,
      courseOutlineSearchValue: searchValue,
      filteredCourseOutline: filtered,
    });
  };

  return (
    <div className={classes['course-outline-table']}>
      <ControlsWrapper className={classes['course-table-toolbar']}>
        <ExportCoursesButton disabled={disableActions} />
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
          columns={getColumns()}
          rowClassName={(record) => record.className}
          className={classes['course-table']}
        />
      ) : (
        <WMTable
          loading={isUpdating || isFetchingCourseData}
          data={[]}
          columns={getColumns()}
          className={classes['course-table']}
        />
      )}
    </div>
  );
}
