import React, { ReactElement, useState } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import {
  useCoursesContext,
  publishCourses,
  archiveCourses,
  fetchCoursesData,
  ActionType,
} from '../../../providers/CoursesContext';

import WMButton, { ButtonVariantEnum } from '../../common/WMButton';
import { PublishToEnvironmentDialog, ArchiveFromEnvironmentDialog } from '../../common/dialogs';

import classes from './style.module.scss';

export default function ProductionStatusActions(): ReactElement {
  const [appState] = useAppContext();
  const {
    dateRange: { from, to },
  } = appState;
  const [{ selectedRows, isPublishingCourses, isArchivingCourses }, dispatch] = useCoursesContext();

  // TODO: uncomment once sdk supports marking as draft
  // const hasPublished = selectedRows.some(
  //   (course) => course.publishStatus === PublishStatus.Published,
  // );
  // const hasArchived = selectedRows.some(
  //   (course) => course.publishStatus === PublishStatus.Archived,
  // );
  // const hasDraft = selectedRows.some((course) => course.publishStatus === PublishStatus.Draft);

  const [showPublish, setShowPublish] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  /*
   *
   * */
  return (
    <>
      <div className={classes['production-status-actions']}>
        <WMButton variant={ButtonVariantEnum.Link} onClick={() => setShowPublish(true)}>
          Publish
        </WMButton>
        <WMButton variant={ButtonVariantEnum.Link} onClick={() => setShowArchive(true)}>
          Archive
        </WMButton>
        {/* TODO: uncomment once sdk supports marking as draft */}
        {/* <WMButton
          variant={ButtonVariantEnum.Link}
          onClick={() => console.log('Production status was changed to draft')}
          disabled={hasPublished || (hasArchived && hasDraft)}
        >
          Mark as Draft
        </WMButton> */}
      </div>
      <PublishToEnvironmentDialog
        coursesCount={selectedRows.length}
        open={showPublish}
        onCancel={() => setShowPublish(false)}
        onConfirm={async (envId) => {
          dispatch({ type: ActionType.PublishCourses });
          await publishCourses(dispatch, envId, selectedRows);
          setShowPublish(false);
          fetchCoursesData(dispatch, envId, from, to);
        }}
        isInProgess={isPublishingCourses}
      />
      <ArchiveFromEnvironmentDialog
        coursesCount={selectedRows.length}
        open={showArchive}
        onCancel={() => setShowArchive(false)}
        onConfirm={async (envId) => {
          dispatch({ type: ActionType.ArchiveCourses });
          await archiveCourses(dispatch, envId, selectedRows);
          setShowArchive(false);
          fetchCoursesData(dispatch, envId, from, to);
        }}
        isInProgess={isArchivingCourses}
      />
    </>
  );
}
