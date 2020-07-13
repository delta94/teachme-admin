import React, { ReactElement, useState } from 'react';

import { CourseItemType } from '../../../interfaces/course.interfaces';
import WMTable from '../../common/WMTable';
import { ICourseOutlineTable } from './courseScreen.interface';
import ControlsWrapper from '../../common/ControlsWrapper';
import ExportButton from '../../common/buttons/ExportButton';
import SearchFilter from '../../common/filters/SearchFilter';

import classes from './style.module.scss';

export default function CourseOutlineTable({ course }: ICourseOutlineTable): ReactElement {
  const [tableData, setTableData] = useState(course.data);

  const onSearch = (searchValue: string) => {
    const isMatch = (item: any) => item.title.toLowerCase().includes(searchValue.toLowerCase());

    const getFilteredLessonChildren = (items: any[]) =>
      items.filter((child: any) => isMatch(child));

    const newTableData = course.data
      .map((item: any) => {
        if (item.type === CourseItemType.Lesson) {
          const someChildrenAreMatch = item.children.some((child: any) => isMatch(child));
          const filteredLesson = { ...item, children: getFilteredLessonChildren(item.children) };

          if (isMatch(item) || someChildrenAreMatch) {
            return filteredLesson;
          }
        } else {
          return isMatch(item) && item;
        }
      })
      .filter((item: any) => Boolean(item));

    setTableData(newTableData);
  };

  return (
    <WMTable
      data={tableData as Array<any>}
      columns={course.columns}
      expandable={{ defaultExpandAllRows: true }}
      rowClassName={(record) => record.className}
      className={classes['course-table']}
    >
      <ControlsWrapper className={classes['course-table-toolbar']}>
        <ExportButton className={classes['export']} />
        <SearchFilter
          className={classes['search']}
          placeholder="Search item name"
          onSearch={onSearch}
        />
      </ControlsWrapper>
    </WMTable>
  );
}
