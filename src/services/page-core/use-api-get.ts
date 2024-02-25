import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { usePageCore } from './page-core-context';
import { IApiInvoke, IApiState } from './types';

export function useApiGet<R>(
  url: string,
  config?: AxiosRequestConfig
): IApiInvoke<any, R> {
  const core = usePageCore();
  const apiBaseUrl = core.config.apiBaseUrl;
  const [state, setState] = useState<IApiState<any, R>>({
    data: null,
    result: null,
    status: 'start',
    error: null
  });

  const start = useCallback(
    () => {
      setState({
        data: null,
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
          .get<R>(`${apiBaseUrl}/${url}`, config)
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
    [url, config, state.status, apiBaseUrl]
  );

  return { start, state };
}
