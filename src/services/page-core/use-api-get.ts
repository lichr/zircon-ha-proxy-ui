import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { usePageCore } from './page-core-context';
import { IApiInvoke, IApiState } from './types';

export function useApiGet<R>(
  url: string,
  config?: AxiosRequestConfig
): IApiInvoke<any, R> {
  const core = usePageCore();
  const baseUrl = core.config.baseUrl;
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
          .get<R>(`${baseUrl}/${url}`, config)
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
    [url, config, state.status, baseUrl]
  );

  return { start, state };
}
