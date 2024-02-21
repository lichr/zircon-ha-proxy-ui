import { useEffect, useRef, useState } from 'react';
import { usePageCore } from './page-core-context';
import { IPageState } from './types';

export function usePageState<T=IPageState>(extractor?: (state: IPageState) => T): T {
  const core = usePageCore();
  const extractorRef = useRef(extractor);
  extractorRef.current = extractor;

  const [value, setValue] = useState<T>(() => extractorRef.current ? extractorRef.current(core.state) : core.state as T);

  useEffect(
    () => {
      const f = (state: IPageState) => {
        setValue(extractorRef.current ? extractorRef.current(state) : state as T);
      };
      core.emitter.on('state-update', f);
      return () => {
        core.emitter.off('state-update', f);
      };
    },
    [core]
  )

  return value;
}
