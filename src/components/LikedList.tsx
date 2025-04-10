import { useEffect, useRef } from 'react';
import { useInfiniteLikedBooks } from '../hooks';
import type { BookDocument } from '../types';
import { InfiniteScrollTrigger } from './shared';

const LOCAL_STORAGE_KEY = 'liked_books';

const BookList = () => {
  const allBooks: BookDocument[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteLikedBooks(allBooks);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages.map((page, pageIndex) => (
        <ul key={pageIndex} style={{ display: 'contents' }}>
          {page.documents.map((book) => (
            <li
              key={book.title + book.isbn}
              value={book.title + book.isbn}
              style={{ minHeight: '100px' }}
            >
              {book.title}
            </li>
          ))}
        </ul>
      ))}
      <InfiniteScrollTrigger
        onIntersect={() => {
          fetchNextPage();
        }}
        enabled={hasNextPage && !isFetchingNextPage}
      />
      {isFetchingNextPage && <p>로딩 중...</p>}
    </>
  );
};

export default BookList;
