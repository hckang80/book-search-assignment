import { useEffect, useRef } from 'react';
import { useInfiniteBookSearch } from '../hooks/useInfiniteBookSearch';
import type { BookSearchParams } from '../types';

interface BookListProps {
  query: string;
  params: BookSearchParams;
}

const BookList = ({ query, params }: BookListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteBookSearch(
    query,
    params
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
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
        <div key={pageIndex}>
          {page.documents.map((book) => (
            <div key={book.isbn}>{book.title}</div>
          ))}
        </div>
      ))}
      <div ref={observerRef} style={{ height: 50 }} />
      {isFetchingNextPage && <p>로딩 중...</p>}
    </>
  );
};

export default BookList;
