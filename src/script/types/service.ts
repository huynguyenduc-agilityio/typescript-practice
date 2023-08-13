export enum API_HEADERS {
  'Content-Type' = 'application/json',
}

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export type AllowedQueryKeys = 'start' | 'limit' | 'sort' | 'order';

export type QueryParams = {
  [key in AllowedQueryKeys]?: string | number;
};
