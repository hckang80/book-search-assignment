import { useEffect, useRef } from 'react';
import { useInfiniteBookSearch } from '../hooks';
import { Accordion } from 'radix-ui';
import type { BookSearchParams } from '../types';
import { InfiniteScrollTrigger } from './shared';
import { Button, Theme } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';
import * as styles from './BookList.css';
import { BookContext } from '.';

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
        <Theme>
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex} style={{ display: 'contents' }}>
              {page.documents.map((book) => (
                <Accordion.Item
                  className={styles.item}
                  key={book.title + book.isbn}
                  value={book.title + book.isbn}
                >
                  <div className={styles.opener}>
                    <div className={styles.thumbnail}>
                      <img
                        src={book.thumbnail}
                        alt=""
                        width="48"
                        height="70"
                        loading={pageIndex ? 'lazy' : 'eager'}
                        decoding={pageIndex ? 'async' : 'sync'}
                      />
                    </div>
                    <div className={styles.title}>
                      <span className="title3">{book.title}</span>
                      <span className="body2 text-secondary">{book.authors}</span>
                    </div>
                    <div className={styles.price}>
                      <span className="title3">{book.sale_price}</span>
                    </div>
                    <div className={styles.buttons}>
                      <Button className={styles.button} size="4" asChild>
                        <a href={book.url} target="_blank" rel="noopener noreferrer">
                          구매하기
                        </a>
                      </Button>
                      <Accordion.Trigger asChild>
                        <Button className={styles.button} size="4" color="gray" variant="soft">
                          상세보기
                          <ChevronDown size={18} />
                        </Button>
                      </Accordion.Trigger>
                    </div>
                  </div>
                  <BookContext book={book} />
                </Accordion.Item>
              ))}
            </div>
          ))}
        </Theme>
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
