import { axiosInstance } from './axiosInstance';
import type { BookDocument, BookInstance, BookSearchParams } from 'src/types';
import { PAGE_SIZE } from 'src/lib/constant';

export const fetchBookSearch = async (params: BookSearchParams) => {
  const { data } = await axiosInstance.get<BookInstance>(`/search/book`, { params });

  return data;
};

export const fetchLikedBooks = async (allBooks: BookDocument[], pageParam: number) => {
  const { length: total_count } = allBooks;
  const pageable_count = total_count;
  const startIndex = (pageParam - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pageItems = allBooks.slice(startIndex, endIndex);

  const response: BookInstance = {
    documents: pageItems,
    meta: {
      is_end: endIndex >= total_count,
      pageable_count,
      total_count
    }
  };

  return Promise.resolve(response);
};
