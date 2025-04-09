import { axiosInstance } from './axiosInstance';
import type { BookInstance, BookSearchParams } from '../types';

export const fetchBookSearch = async (params: BookSearchParams) => {
  const { data } = await axiosInstance.get<BookInstance>(`/search/book`, { params });

  return data;
};
