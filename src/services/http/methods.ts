import { request } from './request';
import type { RequestOptions } from './request';

export const httpGet = <T>(url: string, options?: RequestOptions) =>
  request<T>('GET', url, options);

export const httpPut = <T>(url: string, options?: RequestOptions) =>
  request<T>('PUT', url, options);

export const httpDelete = <T>(url: string, options?: RequestOptions) =>
  request<T>('DELETE', url, options);
