import { useInfiniteLikedBooks } from '../hooks';
import type { BookDocument } from '../types';
import { InfiniteScrollTrigger } from './shared';
import * as styles from './BookList.css';
import { BookContext, BookItem } from '.';
import { Accordion } from 'radix-ui';
import { Theme } from '@radix-ui/themes';

const LOCAL_STORAGE_KEY = 'liked_books';

const BookList = () => {
  const allBooks: BookDocument[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteLikedBooks(allBooks);

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
