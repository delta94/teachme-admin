import React from 'react';
import TimeAgo from 'timeago-react';

export default function LastUpdateTime({ datetime }: any) {
  return (
    <div>
      Data was last updated
      <TimeAgo datetime={datetime} />
    </div>
  );
}
