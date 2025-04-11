import { useInfiniteBookSearch } from '../hooks';
import { Accordion } from 'radix-ui';
import type { BookSearchParams } from '../types';
import { InfiniteScrollTrigger } from './shared';
import { Theme } from '@radix-ui/themes';
import * as styles from './BookList.css';
import { BookContext, BookItem } from '.';

interface BookListProps {
  query: string;
  params: BookSearchParams;
}

const BookList = ({ query, params }: BookListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteBookSearch(
    query,
    params
  );

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
      {isFetchingNextPage && <p>로딩 중...</p>}
    </>
  );
};

export default BookList;
