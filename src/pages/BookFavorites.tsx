import { BookList, NoData } from '../components';
import { useInfiniteLikedBooks } from '../hooks';
import type { BookDocument } from '../types';

const LOCAL_STORAGE_KEY = 'liked_books';

export default function BookFavorites() {
  const allBooks: BookDocument[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  const infiniteQuery = useInfiniteLikedBooks(allBooks);

  return allBooks.length ? (
    <BookList infiniteQuery={infiniteQuery} />
  ) : (
    <NoData message="찜한 책이 없습니다." />
  );
}
