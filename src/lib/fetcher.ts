'use server';

import { cookies } from 'next/headers';

import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';

// you can use this key for auth header if your server has any
import { AUTH_TOKEN_SESSION_KEY } from './constants';


const { API_URL } = process.env;

type GraphqlResponse<Response> = {
  errors?: any[];
  data: Response;
};

type FetcherOptions<Result = any, Variables = any> = {
  document: TypedDocumentNode<Result, Variables>;
  variables?: Variables;
  headers?: HeadersInit
} & (
  | {
      cache: RequestCache;
      next?: {
        revalidate?: never;
      } & Omit<NextFetchRequestConfig, 'revalidate'>;
    }
  | {
      cache?: never;
      next?: {
        revalidate?: number | false;
      } & Omit<NextFetchRequestConfig, 'revalidate'>;
    }
);

export const fetcher = async <Result = any, Variables = any>({
  document,
  variables,
  cache = 'no-store', // making cache opt-in
  next,
  headers,
}: FetcherOptions<Result, Variables>): Promise<Result | never> => {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_TOKEN_SESSION_KEY);

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token.value}` : '',
      ...headers
    },
    body: JSON.stringify({
      query: print(document),
      variables,
    }),
    // only set cache if revalidate is not set
    ...(next?.revalidate ? { next } : { cache, ...next }),
  });

  /**
   * The step below is needed if the server responds with a authtoken in a custom header.
   * If your server sends the token via Set-Cookie header, this step is not needed.
   */
  const authToken = res.headers.get(AUTH_TOKEN_SESSION_KEY);
  if (authToken) {
    try {
      cookieStore.set(AUTH_TOKEN_SESSION_KEY, authToken);
    } catch (e) {
      console.error(
        'Failed to set token in cookie store',
        (e as Error).message
      );
    }
  }
 //
  const body = (await res.json()) as GraphqlResponse<Result>;
  if (body.errors) {
    throw body.errors[0];
  }

  return body.data;
};