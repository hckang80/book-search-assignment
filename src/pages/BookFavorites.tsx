import { BookList, NoData } from '../components';
import { useInfiniteLikedBooks } from '../hooks';
import { likedBooksStore } from '../store';

export default function BookFavorites() {
  const { likedBooks } = likedBooksStore();

  const infiniteQuery = useInfiniteLikedBooks(likedBooks);

  return likedBooks.length ? (
    <BookList infiniteQuery={infiniteQuery} />
  ) : (
    <NoData message="찜한 책이 없습니다." />
  );
}
