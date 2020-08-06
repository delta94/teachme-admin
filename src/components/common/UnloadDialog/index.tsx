import React, { useCallback } from 'react';
import { Prompt } from 'react-router-dom';

import useEventListener from '../../../hooks/useEventListener';

function browserOnBeforeUnload(e: BeforeUnloadEvent, hasChanges: boolean) {
  e.preventDefault();

  // e.returnValue is needed for showing the user a prompt
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
  if (hasChanges) {
    e.returnValue = '';
  } else {
    delete e.returnValue;
  }
}

/**
 * Use the `UnloadDialog` component when you need to warn users before leaving a page.
 * A wrapper for react-router-dom's `Prompt` component that also warns when the user tries to: reload / close tab / close window / leave the SPA
 *
 * Note: The custom message you can provide as a prop will only be shown when the user tries to change pages within the SPA. For all other prompts, the browser displays its own built-in message.
 */
function UnloadDialog({
  when,
  message = 'You have unsaved changes which will be lost if you leave this page. Do you want to continue?',
}: {
  when: boolean;
  message?: string;
}) {
  const beforeUnloadCallback = useCallback(
    (e) => {
      browserOnBeforeUnload(e, when);
    },
    [when],
  );

  useEventListener('beforeunload', beforeUnloadCallback);

  return <Prompt when={when} message={message} />;
}

export default UnloadDialog;
