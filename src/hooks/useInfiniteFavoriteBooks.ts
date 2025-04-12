import { useInfiniteQuery } from '@tanstack/react-query';
import type { BookDocument } from 'src/types';
import { fetchLikedBooks } from 'src/api';

export const useInfiniteFavoriteBooks = (allBooks: BookDocument[]) => {
  return useInfiniteQuery({
    queryKey: ['favoritedBooks', allBooks],
    queryFn: ({ pageParam }) => fetchLikedBooks(allBooks, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const { is_end: isListEnd } = lastPage.meta;
      return isListEnd ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: Infinity
  });
};
