import type {UseFetchOptions} from 'nuxt/app'
import {useRequestHeaders} from "nuxt/app";
import ApiError from '~/types/ApiError';

export const useApi = <T>(path: string, options: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig();
  const apiConfig = config.public;

  const SECURE_METHODS = new Set(['post', 'delete', 'put', 'patch']);
  const UNAUTHENTICATED_STATUSES = new Set([401, 419]);
  const VALIDATION_ERROR_STATUS = 422;  

  let headers: any = {
    accept: "application/json",
    referer: apiConfig.baseURL
  }

  // const token = useCookie(apiConfig.cookieName, {watch: true});

  // if (token.value) {
  //   // headers.authorization = `Bearer ${token.value}` as string;
  // }

  if (process.server) {
    headers = {
      ...headers,
      // ...useRequestHeaders(["cookie"]),
    }
  } 

  return useFetch(apiConfig.apiURL + path, {
    //credentials: "include",
    watch: false,
    ...options,
    // headers: {
    //   ...headers,
    //   ...options?.headers
    // },
    onRequest({ request, options }) {
      if (process.client) {
        const method = options.method?.toLocaleLowerCase() ?? '';
        if (!SECURE_METHODS.has(method)) {
          return;
        }
      }
    },    
    async onResponseError({ response }) {
      const responseData = response._data?.data ?? response._data;
      if (UNAUTHENTICATED_STATUSES.has(response.status)) {
        if (apiConfig.redirectUnauthenticated) {
          await navigateTo(config.public.loginUrl);
          return;
        } else {
          throw new ApiError(responseData);
        }
      }

      if (response.status === VALIDATION_ERROR_STATUS) {
        // throw new ApiError(responseData);
      }
    }    
  });
};

export const useApiSSR = <T>(
  path: string,
  {
    params = {},
    body,
  }: {
    params?: any;
    body?: any;
  } = {}
) => {
  const config = useRuntimeConfig();
  // const cookies = useCookie('accessToken');

  return useFetch<T>(path, {
    baseURL: config.public.apiURL,
    body,
    params: params,
    headers: {
      //Authorization: cookies.value ? `Bearer ${cookies.value}` : undefined,
    } as HeadersInit,
  });
};
