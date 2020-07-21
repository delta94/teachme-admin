import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { Divider } from 'antd';

import { CourseChildData, CourseChild } from '../../../../walkme/course/mappers/course/courseItems';
import { getCourse } from '../../../../walkme';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import WMCard from '../../../common/WMCard';
import { CourseOutlineList } from '../../../common/lists';

import classes from './playground.module.scss';
import { ICourseOutlineList } from '../../../common/lists/CourseOutlineList';

export default function QuizEdit(): ReactElement {
  const [courseId, setCourseId] = useState(0);
  const [courseOutline, setCourseOutline] = useState([] as CourseChild[]);

  const getCourseOutline = useCallback(async () => {
    const course = await getCourse(courseId, 0);
    const courseItems = course && course.items.toArray();

    courseItems.length
      ? setCourseOutline(courseItems as CourseChild[])
      : setCourseOutline(([] as unknown) as CourseChild[]);
  }, [courseId]);

  useEffect(() => {
    // TODO: use useCourseEditorContext
    getCourseOutline();
  }, [courseId, getCourseOutline]);

  return (
    <div className={classes['cards-wrapper']}>
      <WMCard className={classes['buttons']}>
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1284870)}>
          Quiz Settings - courseId 1284870
        </WMButton>
        <Divider />
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1297234)}>
          Quiz Settings - courseId 1297234
        </WMButton>
        <Divider />
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1277328)}>
          Quiz Settings - courseId 1277328
        </WMButton>
        <Divider />
      </WMCard>
      <div className={classes['course-outline-demo']}>
        {/* {courseOutline && (
          <CourseOutlineList
            bordered
            items={courseOutline}
            onItemChange={() => {
              console.log('onItemChange');
            }}
          />
        )} */}
      </div>
      {/* <DetailsPanel
        title={
          <>
            <Icon type={IconType.QuizSettings} /> Quiz Settings
          </>
        }
        isOpen={Boolean(courseId)}
        onClose={() => setCourseId(0)}
      >
        <QuizSettingsForm courseId={courseId} />
      </DetailsPanel> */}
    </div>
  );
}
