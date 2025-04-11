import { LikedList, NoData } from '../components';
import type { BookDocument } from '../types';

const LOCAL_STORAGE_KEY = 'liked_books';

export default function BookFavorites() {
  const allBooks: BookDocument[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

  return allBooks.length ? <LikedList /> : <NoData message="찜한 책이 없습니다." />;
}
