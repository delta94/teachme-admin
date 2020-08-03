import React, { ReactElement } from 'react';

import WMTable from '../../common/WMTable';
import ControlsWrapper from '../../common/ControlsWrapper';
import ExportButton from '../../common/buttons/ExportButton';
import SearchFilter from '../../common/filters/SearchFilter';
import WMTableExpanded from '../../common/WMTable/WMTableExpanded';
import { ICourseOutlineTable, ICourseOutlineItems } from './courseScreen.interface';

import { columns } from './tableData';
import classes from './style.module.scss';
import { getFilteredCourseOutline } from './utils';

export default function CourseOutlineTable({
  courseOutline,
  filteredCourseOutline,
  courseOutlineSearchValue,
  onSearchCourseOutline,
}: ICourseOutlineTable): ReactElement {
  const onSearch = (courseOutlineSearchValue: string) => {
    const filtered = getFilteredCourseOutline(courseOutline, courseOutlineSearchValue);

    onSearchCourseOutline(courseOutlineSearchValue, filtered as ICourseOutlineItems);
  };

  return (
    <div className={classes['course-table-outline']}>
      <ControlsWrapper className={classes['course-table-toolbar']}>
        <ExportButton className={classes['export']} />
        <SearchFilter
          className={classes['search']}
          placeholder="Search item name"
          onSearch={onSearch}
          value={courseOutlineSearchValue}
        />
      </ControlsWrapper>
      {filteredCourseOutline.length ? (
        // Using WMTableExpanded as a new instance of WMTable to expand all rows initially
        <WMTableExpanded
          data={filteredCourseOutline}
          columns={columns}
          rowClassName={(record) => record.className}
          className={classes['course-table']}
        />
      ) : (
        <WMTable data={[]} columns={columns} className={classes['course-table']} />
      )}
    </div>
  );
}
