import type { BookDocument } from '../types';
import { Button } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';
import * as styles from './BookItem.css';
import { Accordion } from 'radix-ui';
import { isSale, toReadableNumber } from '../lib/utils';

const BookItem = ({ book, pageIndex }: { book: BookDocument; pageIndex: number }) => {
  return (
    <div className={`opener ${styles.opener}`}>
      <div className={styles.thumbnail}>
        <img
          className={styles.img}
          src={book.thumbnail || '/blank_thumbnail.gif'}
          alt=""
          width="48"
          height="70"
          loading={pageIndex ? 'lazy' : 'eager'}
          decoding={pageIndex ? 'async' : 'sync'}
        />
      </div>
      <div className={styles.title}>
        <span className="title3">{book.title}</span>
        <span className="body2 text-secondary">{book.authors}</span>
      </div>
      <div className={styles.price}>
        <span className="title3">
          {toReadableNumber(isSale(book.sale_price) ? book.sale_price : book.price)}원
        </span>
      </div>
      <div className={styles.buttons}>
        <Button size="4" asChild>
          <a href={book.url} target="_blank" rel="noopener noreferrer">
            구매하기
          </a>
        </Button>
        <Accordion.Trigger asChild>
          <Button size="4" color="gray" variant="soft">
            상세보기
            <ChevronDown size={18} />
          </Button>
        </Accordion.Trigger>
      </div>
    </div>
  );
};

export default BookItem;
