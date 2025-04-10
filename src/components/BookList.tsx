import { useEffect, useRef } from 'react';
import { useInfiniteBookSearch } from '../hooks';
import { Accordion } from 'radix-ui';
import type { BookDocument, BookSearchParams } from '../types';
import { InfiniteScrollTrigger } from './shared';

interface BookListProps {
  query: string;
  params: BookSearchParams;
}

const LOCAL_STORAGE_KEY = 'liked_books';

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

  const toggleLikedBook = (book: BookDocument) => {
    const saved: BookDocument[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const exists = saved.find((item) => item.isbn === book.isbn && item.title === book.title);
    const updated = exists
      ? saved.filter((item) => item.isbn !== book.isbn || item.title !== book.title)
      : [...saved, book];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <>
      <Accordion.Root type="single" collapsible>
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex} style={{ display: 'contents' }}>
            {page.documents.map((book) => (
              <Accordion.Item key={book.title + book.isbn} value={book.title + book.isbn}>
                <div>
                  <div>
                    <img
                      src={book.thumbnail}
                      alt=""
                      width="120"
                      height="174"
                      loading={pageIndex ? 'lazy' : 'eager'}
                      decoding={pageIndex ? 'async' : 'sync'}
                    />
                  </div>
                  <Accordion.Trigger>상세보기</Accordion.Trigger>
                </div>
                <Accordion.Content>
                  <button onClick={() => toggleLikedBook(book)}>
                    <img src={book.thumbnail} alt={book.title} />
                  </button>
                  {book.title}
                  <Accordion.Trigger>상세보기</Accordion.Trigger>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </div>
        ))}
      </Accordion.Root>
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
