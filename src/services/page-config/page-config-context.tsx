import axios from 'axios';
import _ from 'lodash';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface IPageConfig {
  apiBaseUrl: string;
}

export const PageConfigContext = createContext<IPageConfig | null>(null);

export function usePageConfig(): IPageConfig {
  const pageConfig = useContext(PageConfigContext);
  if (!pageConfig) {
    throw { code: 'no-context', message: 'page-config-context was not provided' }
  }
  return pageConfig;
}

export function PageConfigProvider(
  props: {
    url: string;
    children?: ReactNode;
  }
): JSX.Element {
  const { url, children } = props;

  const [config, setConfig] = useState<IPageConfig | null>(null);

  useEffect(
    () => {
      const f = async () => {
        try {
          const response = await axios.get(url);
          setConfig(response.data);
        } catch (error) {
          console.error('Error fetching page config', error);
        }
      };
      f();
    },
    [url]
  );

  return (
    <PageConfigContext.Provider value={config}>
      {
        config && children
      }
    </PageConfigContext.Provider>
  );
}
