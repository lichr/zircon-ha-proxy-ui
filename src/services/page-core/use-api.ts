import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { usePageCore } from './page-core-context';
import { IApiInvoke, IApiState } from './types';

export function useApiGet<R>(
  url: string,
  config?: AxiosRequestConfig
) {
  return useApi<any, R, () => void>({ method: 'get', url, autoStart: true, config });
}

export function useApiPut<T=any>(
  url: string,
  config?: AxiosRequestConfig
) {
  return useApi<T, any, (data: T) => void>({ method: 'put', url, config });
}

export function useApiPost<T=any>(
  url: string,
  config?: AxiosRequestConfig
) {
  return useApi<T, any, (data: T) => void>({ method: 'post', url, config });
}

export function useApiDelete<T=any>(
  url: string,
  config?: AxiosRequestConfig
) {
  return useApi<T, any, () => void>({ method: 'delete', url, config });
}

export function useApi<T, R, F>(
  props: {
    method: 'get' | 'put' | 'post' | 'delete';
    url: string;
    data?: T;
    autoStart?: boolean;
    config?: AxiosRequestConfig;
  }
): IApiInvoke<T, R, F> {
  const { method, url, data, autoStart, config } = props;
  const core = usePageCore();
  const baseUrl = core.config.baseUrl;
  const [state, setState] = useState<IApiState<T, R>>({
    data: data ?? null,
    result: null,
    status: autoStart ? 'start' : 'stop',
    error: null
  });

  const start = useCallback(
    (data?: T) => {
      setState({
        data: data ?? null,
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
        axios({
          method,
          url: `${baseUrl}/${url}`,
          data: state.data,
          ...config
        })
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
    [url, config, state.status, baseUrl, state.data, method]
  );

  return { start: start as F, state };
}
