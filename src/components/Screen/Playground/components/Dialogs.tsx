import React, { ReactElement, useState } from 'react';

import { Divider } from 'antd';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';

import DialogPublishToEnvironment from '../../../common/dialogs/PublishToEnvironmentDialog';
import ExportToCSVDialog from '../../../common/dialogs/ExportToCSVDialog';
import DeleteCourseDialog from '../../../common/dialogs/DeleteCourseDialog';
import CantDeleteDialog from '../../../common/dialogs/CantDeleteDialog';
import DuplicateCourseDialog from '../../../common/dialogs/DuplicateCourseDialog';
import ImpersonateDialog from '../../../common/dialogs/ImpersonateDialog';
import LoadingPublishingDialog from '../../../common/dialogs/LoadingPublishingDialog';
import DeleteLessonDialog from '../../CourseEditorScreen/LessonHeader/DeleteLessonDialog';

export default function Dialogs(): ReactElement {
  const [showPublish, setShowPublish] = useState(false);
  const [showPublishing, setShowPublishing] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showDeleteCourse, setShowDeleteCourse] = useState(false);
  const [showCantDeleteCourse, setShowCantDeleteCourse] = useState(false);
  const [showDuplicateCourse, setShowDuplicateCourse] = useState(false);
  const [showImpersonate, setShowImpersonate] = useState(false);
  const [showDeleteLesson, setShowDeleteLesson] = useState(false);

  function showLoadingPublishingDialog() {
    setShowPublishing(true);

    setTimeout(() => {
      setShowPublishing(false);
    }, 3000);
  }

  return (
    <>
      <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setShowPublish(!showPublish)}>
        show Publish Dialog
      </WMButton>
      <DialogPublishToEnvironment
        coursesCount={1}
        open={showPublish}
        onCancel={() => setShowPublish(false)}
        onConfirm={() => setShowPublish(false)}
      />
      <Divider />
      <WMButton variant={ButtonVariantEnum.Primary} onClick={showLoadingPublishingDialog}>
        show Publishing
      </WMButton>
      <LoadingPublishingDialog
        open={showPublishing}
        onClose={() => setShowPublishing(false)}
        environment="Test"
      />
      <Divider />
      <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setShowExport(!showExport)}>
        show Export Dialog
      </WMButton>
      <ExportToCSVDialog
        coursesCount={8}
        open={showExport}
        onCancel={() => setShowExport(false)}
        onConfirm={() => setShowExport(false)}
      />
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowDeleteCourse(!showDeleteCourse)}
      >
        show Delete Dialog
      </WMButton>
      <DeleteCourseDialog
        courses={[
          {
            avg_quiz_attempts: null,
            avg_quiz_score: 0,
            id: 1306527,
            publishStatus: 1,
            quiz_passed: false,
            segments: [],
            title: 'Getting Started Program',
            users_completed: 121,
            users_started: 3261,
          },
        ]}
        open={showDeleteCourse}
        onCancel={() => setShowDeleteCourse(false)}
        onConfirm={() => setShowDeleteCourse(false)}
      />
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowCantDeleteCourse(!showCantDeleteCourse)}
      >
        show Cant Delete Course
      </WMButton>
      <CantDeleteDialog
        open={showCantDeleteCourse}
        onCancel={() => setShowCantDeleteCourse(false)}
        onConfirm={() => setShowCantDeleteCourse(false)}
      />
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowDuplicateCourse(!showDuplicateCourse)}
      >
        show Duplicate Course
      </WMButton>
      <DuplicateCourseDialog
        open={showDuplicateCourse}
        onCancel={() => setShowDuplicateCourse(false)}
        onConfirm={() => setShowDuplicateCourse(false)}
        value="Copy of Zendesk Fundamentals"
      />
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowImpersonate(!showImpersonate)}
      >
        show Impersonate
      </WMButton>
      <ImpersonateDialog
        open={showImpersonate}
        onCancel={() => setShowImpersonate(false)}
        onConfirm={() => setShowImpersonate(false)}
      />
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowDeleteLesson(!showDeleteLesson)}
      >
        show Delete Lesson
      </WMButton>
      <DeleteLessonDialog
        open={showDeleteLesson}
        onCancel={() => setShowDeleteLesson(false)}
        onConfirm={() => setShowDeleteLesson(false)}
      />
    </>
  );
}
