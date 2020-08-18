import React, { ReactElement, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import classes from './style.module.scss';

/**
 * Using `window.scrollTo(0, 0)` like suggested in the answers
 * on this {@link https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition SO question}
 * or the {@link https://reactrouter.com/web/guides/scroll-restoration react-router docs} doesn't work,
 * so we're left with this implementation, which seems fairly solid.
 * Just render this component at the top of your app, but below `Router`.
 */
export default function ScrollToTop(): ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollIntoView();
  }, [pathname]);

  return <div ref={scrollRef} className={classes['scroll-to-top']} />;
}
