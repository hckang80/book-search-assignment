import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookDocument } from 'src/types';

interface FavoritedBooksState {
  favoritedBooks: BookDocument[];
  toggle: (book: BookDocument) => void;
  isFavorited: (book: BookDocument) => boolean;
}

export const favoritedBooksStore = create<FavoritedBooksState>()(
  persist(
    (set, get) => ({
      favoritedBooks: [],
      toggle: (book) => {
        const { favoritedBooks, isFavorited } = get();
        const updated = isFavorited(book)
          ? favoritedBooks.filter((item) => item.isbn !== book.isbn || item.title !== book.title)
          : [...favoritedBooks, book];
        set({ favoritedBooks: updated });
      },
      isFavorited: (book) => {
        const { favoritedBooks } = get();
        return favoritedBooks.some((item) => item.isbn === book.isbn && item.title === book.title);
      }
    }),
    {
      name: 'liked_books'
    }
  )
);
