import React, { MemoExoticComponent } from 'react';

export default function connectToContext(
  WrappedComponent: MemoExoticComponent<any>,
  select: () => any,
) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const selectors = select();
    return <WrappedComponent {...selectors} {...props} />;
  };
}
