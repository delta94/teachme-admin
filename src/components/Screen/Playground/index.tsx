import React, { ReactElement, useState } from 'react';

import { Divider } from 'antd';
import WMConfirmationDialog from '../../common/WMConfirmationDialog';
import ScreenHeader from '../../common/ScreenHeader';
import WMButton, { ButtonVariantEnum } from '../../common/WMButton';

import WMInput from '../../common/WMInput';
import classes from './style.module.scss';

export default function Playground(): ReactElement {
  const [showPublish, setShowPublish] = useState(false);
  const [showPublishing, setShowPublishing] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showDeleteCourse, setShowDeleteCourse] = useState(false);
  const [showCantDeleteCourse, setShowCantDeleteCourse] = useState(false);
  const [showDuplicateCourse, setShowDuplicateCourse] = useState(false);
  const [showImpersonate, setShowImpersonate] = useState(false);
  const [showDeleteLesson, setShowDeleteLesson] = useState(false);

  return (
    <div className={classes.playground}>
      <ScreenHeader hideTimeFilter title="Playground" />
      <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setShowPublish(!showPublish)}>
        show Publish Dialog
      </WMButton>
      <WMConfirmationDialog
        open={showPublish}
        title="Publish to"
        confirmLabel="Publish"
        onCancel={() => setShowPublish(false)}
        onConfirm={() => setShowPublish(false)}
      >
        You are about to publish the following courses. Please review before confirmation.
        <ul>
          <li>1 course</li>
          <li>Global settings</li>
        </ul>
      </WMConfirmationDialog>
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowPublishing(!showPublishing)}
        disabled
      >
        show Publishing
      </WMButton>
      <Divider />
      <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setShowExport(!showExport)}>
        show Export Dialog
      </WMButton>
      <WMConfirmationDialog
        open={showExport}
        title="Export data"
        onCancel={() => setShowExport(false)}
        onConfirm={() => setShowExport(false)}
      >
        You are about to export data of 8 courses.
        <ul>
          <li>Download CSV file</li>
          <li>
            Send via email <WMInput />
          </li>
        </ul>
      </WMConfirmationDialog>
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowDeleteCourse(!showDeleteCourse)}
      >
        show Delete Dialog
      </WMButton>
      <WMConfirmationDialog
        open={showDeleteCourse}
        title="Delete Lesson"
        confirmLabel="Delete"
        onCancel={() => setShowDeleteCourse(false)}
        onConfirm={() => setShowDeleteCourse(false)}
      >
        This lesson contains items. Are you sure you want to delete it?
      </WMConfirmationDialog>
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowCantDeleteCourse(!showCantDeleteCourse)}
      >
        show Cant Delete Course
      </WMButton>
      <WMConfirmationDialog
        open={showCantDeleteCourse}
        title="You can’t delete this course"
        confirmLabel="Delete"
        onCancel={() => setShowCantDeleteCourse(false)}
        onConfirm={() => setShowCantDeleteCourse(false)}
      >
        You must first archive a published course in order to delete it
      </WMConfirmationDialog>
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowDuplicateCourse(!showDuplicateCourse)}
      >
        show Duplicate Course
      </WMButton>
      <WMConfirmationDialog
        open={showDuplicateCourse}
        title="Duplicate this course"
        onCancel={() => setShowDuplicateCourse(false)}
        onConfirm={() => setShowDuplicateCourse(false)}
      >
        <WMInput value="Copy of Zendesk Fundamentals" />
      </WMConfirmationDialog>
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowImpersonate(!showImpersonate)}
      >
        show Impersonate
      </WMButton>
      <WMConfirmationDialog
        open={showImpersonate}
        title="Impersonate user"
        onCancel={() => setShowImpersonate(false)}
        onConfirm={() => setShowImpersonate(false)}
      >
        <WMInput placeholder="Enter email address" />
      </WMConfirmationDialog>
      <Divider />
      <WMButton
        variant={ButtonVariantEnum.Primary}
        onClick={() => setShowDeleteLesson(!showDeleteLesson)}
      >
        show Delete Lesson
      </WMButton>
      <WMConfirmationDialog
        open={showDeleteLesson}
        title="Delete lesson"
        onCancel={() => setShowDeleteLesson(false)}
        onConfirm={() => setShowDeleteLesson(false)}
      >
        This lesson contains items.
        <br />
        Are you sure you want to delete it?
      </WMConfirmationDialog>
    </div>
  );
}
