import type { BookDocument } from 'src/types';
import { Button } from '@radix-ui/themes';
import { ChevronDown, Heart } from 'lucide-react';
import * as styles from './BookPreview.css';
import { Accordion } from 'radix-ui';
import { isSale, toReadableNumber } from 'src/lib';

import clsx from 'clsx';
import { memo } from 'react';

const BookPreview = ({
  book,
  pageIndex,
  toggle,
  isFavorited
}: {
  book: BookDocument;
  pageIndex: number;
  toggle: (book: BookDocument) => void;
  isFavorited: boolean;
}) => {
  return (
    <div className={clsx('opener', styles.opener)}>
      <div className={styles.thumbnail}>
        <button className={styles.linkedButton} onClick={() => toggle(book)}>
          <img
            className={styles.img}
            src={book.thumbnail || '/blank_thumbnail.gif'}
            alt=""
            width="48"
            height="70"
            loading={pageIndex ? 'lazy' : 'eager'}
            decoding={pageIndex ? 'async' : 'sync'}
          />
          {isFavorited ? (
            <Heart
              className={styles.icon}
              size={14}
              color="var(--palette-red)"
              fill="var(--palette-red)"
            />
          ) : (
            <Heart className={styles.icon} size={14} color="#fff" />
          )}
        </button>
      </div>
      <div className={styles.title}>
        <span className="title3">{book.title}</span>
        <span className="body2 text-secondary">{book.authors.join(', ')}</span>
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
            <ChevronDown size={18} color="#b1b8c0" />
          </Button>
        </Accordion.Trigger>
      </div>
    </div>
  );
};

export default memo(BookPreview);
