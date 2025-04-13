import { InfiniteScrollTrigger } from 'src/components/common';
import * as styles from './BookList.css';
import { BookSpecs, BookPreview } from '..';
import { Accordion } from 'radix-ui';
import { Theme } from '@radix-ui/themes';
import SyncLoader from 'react-spinners/SyncLoader';
import { useInfiniteBookSearch } from 'src/hooks';

interface BookListProps {
  infiniteQuery: ReturnType<typeof useInfiniteBookSearch>;
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
                  <BookPreview book={book} pageIndex={pageIndex} />
                  <BookSpecs book={book} />
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
