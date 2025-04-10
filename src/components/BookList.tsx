import { useEffect, useRef } from 'react';
import { useInfiniteBookSearch } from '../hooks/useInfiniteBookSearch';
import { Accordion } from 'radix-ui';
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
      <Accordion.Root type="single" collapsible>
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex} style={{ display: 'contents' }}>
            {page.documents.map((book) => (
              <Accordion.Item key={book.title + book.isbn} value={book.title + book.isbn}>
                <Accordion.Trigger>상세보기</Accordion.Trigger>
                <Accordion.Content>
                  {book.title}
                  <Accordion.Trigger>상세보기</Accordion.Trigger>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </div>
        ))}
      </Accordion.Root>
      <div ref={observerRef} style={{ height: 50 }} />
      {isFetchingNextPage && <p>로딩 중...</p>}
    </>
  );
};

export default BookList;
