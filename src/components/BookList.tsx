import type { BookInstance } from 'src/types';
import { InfiniteScrollTrigger } from './shared';
import * as styles from './BookList.css';
import { BookContext, BookItem } from '.';
import { Accordion } from 'radix-ui';
import { Theme } from '@radix-ui/themes';
import SyncLoader from 'react-spinners/SyncLoader';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

interface BookListProps {
  infiniteQuery: UseInfiniteQueryResult<InfiniteData<BookInstance, unknown>, Error>;
}

const BookList = ({ infiniteQuery }: BookListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQuery;

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
                  <BookItem book={book} pageIndex={pageIndex} />
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
      {isFetchingNextPage && <SyncLoader className={styles.loader} />}
    </>
  );
};

export default BookList;
