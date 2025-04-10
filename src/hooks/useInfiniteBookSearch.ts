import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBookSearch } from '../api';
import type { BookSearchParams } from '../types';

export const useInfiniteBookSearch = (query: string, params: BookSearchParams) => {
  return useInfiniteQuery({
    queryKey: ['search', params],
    queryFn: ({ pageParam }) => fetchBookSearch({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const { is_end: isListEnd } = lastPage.meta;
      return isListEnd ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5
  });
};
