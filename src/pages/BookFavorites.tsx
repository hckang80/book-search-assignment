import { BookList, NoData } from 'src/components';
import { useInfiniteFavoriteBooks } from 'src/hooks';
import { toReadableNumber } from 'src/lib';
import { favoritedBooksStore } from 'src/store';
import * as styles from './PageLayout.css';

export default function BookFavorites() {
  const { favoritedBooks } = favoritedBooksStore();

  const infiniteQuery = useInfiniteFavoriteBooks(favoritedBooks);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQuery;

  return (
    <section>
      <h2 className="title2">내가 찜한 책</h2>
      <div className={styles.searchResult}>
        <header className={styles.searchResultHeader}>
          <h3 className={styles.subHeading}>찜한 책</h3>
          <div>
            총 <span className="text-blue">{toReadableNumber(favoritedBooks.length)}</span>건
          </div>
        </header>
        {favoritedBooks.length ? (
          <BookList
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        ) : (
          <NoData message="찜한 책이 없습니다." />
        )}
      </div>
    </section>
  );
}
