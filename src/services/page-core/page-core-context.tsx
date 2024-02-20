import _ from 'lodash';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { usePageConfig } from '../page-config';
import { PageCore } from './page-core';

export const PageCoreContext = createContext<PageCore | null>(null);

export function usePageCore(): PageCore {
  const PageCore = useContext(PageCoreContext);
  if (!PageCore) {
    throw { code: 'no-context', message: 'page-core-context was not provided' }
  }
  return PageCore;
}

export function PageCoreProvider(
  props: {
    children?: ReactNode;
  }
  ): JSX.Element {
  const { children } = props;

  const PageCoreRef = useRef<PageCore | null>(null);
  const config = usePageConfig();

  if (!PageCoreRef.current) {
    PageCoreRef.current = new PageCore(config);
  }
  const core = PageCoreRef.current;

  return  (
    <PageCoreContext.Provider value={core}>
      { children }
    </PageCoreContext.Provider>
  );
}
