import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookDocument } from '../types';

interface LikedBooksState {
  likedBooks: BookDocument[];
  toggleLikedBook: (book: BookDocument) => void;
  isLiked: (book: BookDocument) => boolean;
}

export const likedBooksStore = create<LikedBooksState>()(
  persist(
    (set, get) => ({
      likedBooks: [],
      toggleLikedBook: (book) => {
        const { likedBooks, isLiked } = get();
        const updated = isLiked(book)
          ? likedBooks.filter((item) => item.isbn !== book.isbn || item.title !== book.title)
          : [...likedBooks, book];
        set({ likedBooks: updated });
      },
      isLiked: (book) => {
        const { likedBooks } = get();
        return likedBooks.some((item) => item.isbn === book.isbn && item.title === book.title);
      }
    }),
    {
      name: 'liked_books'
    }
  )
);
