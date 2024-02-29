import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { usePageCore } from './page-core-context';
import { IApiInvoke, IApiState } from './types';

export function useApiPut<T>(
  url: string,
  config?: AxiosRequestConfig
): IApiInvoke<T, any, (data: any)=>void> {
  const core = usePageCore();
  const baseUrl = core.config.baseUrl;
  const [state, setState] = useState<IApiState<T, any>>({
    data: null,
    result: null,
    status: 'stop',
    error: null
  });

  const start = useCallback(
    (data: T) => {
      setState({
        data,
        result: null,
        status: 'start',
        error: null
      });
    },
    []
  );

  useEffect(
    () => {
      if (state.status === 'start') {
        axios
          .put<T>(`${baseUrl}/${url}`, state.data, config)
          .then((response) => {
            setState({
              data: null,
              result: response.data,
              status: 'ok',
              error: null
            });
          })
          .catch((error) => {
            setState({
              data: null,
              result: null,
              status: 'error',
              error
            });
          });
        setState({
          data: null,
          result: null,
          status: 'pending',
          error: null
        });
      }
    },
    [url, config, state.status, baseUrl, state.data]
  );

  return { start, state };
}
