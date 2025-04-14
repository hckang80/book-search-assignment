import type { BookDocument } from 'src/types';
import { Accordion } from 'radix-ui';
import * as styles from './BookSpecs.css';
import { ChevronUp, Heart } from 'lucide-react';
import { Button } from '@radix-ui/themes';
import { isSale, toReadableNumber } from 'src/lib';
import { memo } from 'react';

const BookSpecs = ({
  book,
  toggle,
  isFavorited
}: {
  book: BookDocument;
  toggle: (book: BookDocument) => void;
  isFavorited: boolean;
}) => {
  return (
    <Accordion.Content className={styles.wrapper}>
      <div className={styles.context}>
        <div className={styles.thumbnail}>
          <span className={styles.image}>
            <img
              src={book.thumbnail || '/blank_thumbnail.gif'}
              alt={book.title}
              width="210"
              height="305"
            />
            <button className={styles.linkedButton} onClick={() => toggle(book)}>
              {isFavorited ? (
                <Heart color="var(--palette-red)" fill="var(--palette-red)" />
              ) : (
                <Heart color="#fff" />
              )}
            </button>
          </span>
        </div>
        <div className={styles.detail}>
          <div className={styles.title}>
            <span className="title3">{book.title}</span>
            <span className="body2 text-subtitle">{book.authors.join(', ')}</span>
          </div>
          <dl className={styles.summary}>
            <dt className={styles.about}>책 소개</dt>
            <dd className={styles.contents}>{book.contents}</dd>
          </dl>
        </div>
        <div className={styles.action}>
          <Accordion.Trigger asChild>
            <Button size="4" color="gray" variant="soft">
              상세보기
              <ChevronUp size={18} color="#b1b8c0" />
            </Button>
          </Accordion.Trigger>
          <div className={styles.prices}>
            <span className={styles.price}>
              <em className={styles.priceLabel}>원가</em>
              <span className={isSale(book.sale_price) ? styles.priceSaleValue : styles.priceValue}>
                {toReadableNumber(book.price)}원
              </span>
            </span>
            {isSale(book.sale_price) && (
              <span className={styles.price}>
                <em className={styles.priceLabel}>할인가</em>
                <span className={styles.priceValue}>{toReadableNumber(book.sale_price)}원</span>
              </span>
            )}
          </div>
          <Button className={styles.cta} size="4" asChild>
            <a href={book.url} target="_blank" rel="noopener noreferrer">
              구매하기
            </a>
          </Button>
        </div>
      </div>
    </Accordion.Content>
  );
};

export default memo(BookSpecs);
