import { HttpStatusCode } from 'axios';

export interface IPagination {
  limit?: number
  page?: number
  totalPages?: number
  total?: number
}

export interface IErrorResponses {
  message?: string
  status?: HttpStatusCode
  error?: string
}

export interface IDataResponse<T> {
  data: T
  currentPage?: number
  totalPages?: number
  totalItems?: number
}

export interface TResponse<T> {
  data: T
  statusCode: HttpStatusCode
  message: string
}

export interface IDataResponse<T> {
  data: T
  currentPage?: number
  totalPages?: number
  totalItems?: number
}