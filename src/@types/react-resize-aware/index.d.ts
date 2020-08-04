declare module 'react-resize-aware' {
  import { ReactNode } from 'react';

  export default function useResizeAware(
    callback?: (target: EventTarget) => void,
  ): [ReactNode, { width: number; height: number }];
}
