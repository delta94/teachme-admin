import React, { ReactElement, useEffect, useRef } from 'react';

import classes from './style.module.scss';

/**
 * Nothing from the answers on this {@link https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition SO question}
 * or the {@link https://reactrouter.com/web/guides/scroll-restoration react-router docs} is working,
 * so we're left with this implementation, which seems fairly solid.
 * Just insert this component next to the one you need to be scrolled to top on mount.
 */
export default function ScrollToTopOnMount(): ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollIntoView();
  }, []);

  return <div ref={scrollRef} className={classes['scroll-to-top-on-mount']} />;
}
