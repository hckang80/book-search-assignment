import { useInfiniteQuery } from '@tanstack/react-query';
import type { BookDocument } from '../types';
import { fetchLikedBooks } from '../api';

export const useInfiniteLikedBooks = (allBooks: BookDocument[]) => {
  return useInfiniteQuery({
    queryKey: ['likedBooks'],
    queryFn: ({ pageParam }) => fetchLikedBooks(allBooks, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const { is_end: isListEnd } = lastPage.meta;
      return isListEnd ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: Infinity
  });
};
