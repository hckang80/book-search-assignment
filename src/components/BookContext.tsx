import type { BookDocument } from '../types';
import { Accordion } from 'radix-ui';
import { ChevronUp } from 'lucide-react';
import { Button } from '@radix-ui/themes';

const LOCAL_STORAGE_KEY = 'liked_books';

const BookContext = ({ book }: { book: BookDocument }) => {
  const toggleLikedBook = (book: BookDocument) => {
    const saved: BookDocument[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const exists = saved.find((item) => item.isbn === book.isbn && item.title === book.title);
    const updated = exists
      ? saved.filter((item) => item.isbn !== book.isbn || item.title !== book.title)
      : [...saved, book];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <Accordion.Content>
      <div>
        <button onClick={() => toggleLikedBook(book)}>
          <img src={book.thumbnail} alt={book.title} />
        </button>
      </div>
      <div>
        <div>
          <span>{book.title}</span>
          <span>{book.authors}</span>
        </div>
        <dl>
          <dt>책 소개</dt>
          <dd>{book.contents}</dd>
        </dl>
      </div>
      <div>
        <Accordion.Trigger asChild>
          <Button size="4" color="gray" variant="soft">
            상세보기
            <ChevronUp size={18} />
          </Button>
        </Accordion.Trigger>
        <div>
          <span>{book.price}</span>
          <span>{book.sale_price}</span>
        </div>
        <Button size="4" asChild>
          <a href={book.url} target="_blank" rel="noopener noreferrer">
            구매하기
          </a>
        </Button>
      </div>
    </Accordion.Content>
  );
};

export default BookContext;
