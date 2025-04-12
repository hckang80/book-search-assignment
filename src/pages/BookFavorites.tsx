import { BookList, NoData } from '../components';
import { useInfiniteLikedBooks } from '../hooks';
import { toReadableNumber } from '../lib/utils';
import { likedBooksStore } from '../store';
import * as styles from './BookSearch.css';

export default function BookFavorites() {
  const { likedBooks } = likedBooksStore();

  const infiniteQuery = useInfiniteLikedBooks(likedBooks);

  return (
    <section>
      <h2 className={`title2 ${styles.heading}`}>내가 찜한 책</h2>
      <div className={styles.searchResult}>
        <header className={styles.searchResultHeader}>
          <h3 className={styles.subHeading}>찜한 책</h3>
          <div>
            총 <span className="text-blue">{toReadableNumber(likedBooks.length)}</span>건
          </div>
        </header>
        {likedBooks.length ? (
          <BookList infiniteQuery={infiniteQuery} />
        ) : (
          <NoData message="찜한 책이 없습니다." />
        )}
      </div>
    </section>
  );
}
