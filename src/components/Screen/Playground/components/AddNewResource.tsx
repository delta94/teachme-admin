import React, { ReactElement, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import { useAppContext } from '../../../../providers/AppContext';
import {
  useCourseEditorContext,
  ActionType,
  fetchItemsList,
  fetchCourse,
} from '../../../../providers/CourseEditorContext';

import DetailsPanel from '../../../common/DetailsPanel';

import Icon, { IconType } from '../../../common/Icon';
import ResourcesActionMenu from '../../CourseEditorScreen/ResourcesActionMenu';
import ResourcesList from '../../CourseEditorScreen/ResourcesList';

import classes from './playground.module.scss';

export default function AddNewResource(): ReactElement {
  const [{ course, isFetchingCourse, hasChanges }, dispatch] = useCourseEditorContext();
  const [{ environment }] = useAppContext();
  const { courseId } = useParams();
  const history = useHistory();
  const [newResourceType, setNewResourceType] = useState<any>();

  const handleItemChanged = (updatedItem: ContentItem) => {
    setNewResourceType(updatedItem);
  };

  useEffect(() => {
    fetchItemsList(dispatch, environment.id);
    fetchCourse(dispatch, courseId, environment.id, history);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId, environment.id, history]);

  return (
    <div className={classes['cards-wrapper']}>
      <ResourcesList
        className={classes['resources-list-playground']}
        actionMenu={<ResourcesActionMenu className={classes['resources-action-menu']} />}
      />
      <DetailsPanel
        title="New Resource"
        titleIcon={<Icon type={IconType.Article} />}
        isOpen={Boolean(newResourceType)}
        onClose={() => setNewResourceType(undefined)}
        titleIsEllipsis
      >
        <div>Resource Form</div>
      </DetailsPanel>
    </div>
  );
}
