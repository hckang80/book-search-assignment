import { useInfiniteQuery } from '@tanstack/react-query';
import type { BookDocument, BookInstance } from '../types';

const PAGE_SIZE = 10;

export const useInfiniteLikedBooks = (allBooks: BookDocument[]) => {
  return useInfiniteQuery({
    queryKey: ['likedBooks'],
    queryFn: ({ pageParam }) => {
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
    },
    getNextPageParam: (lastPage, allPages) => {
      const { is_end: isListEnd } = lastPage.meta;
      return isListEnd ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: Infinity
  });
};
