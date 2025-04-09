export interface BookSearchParams {
  query: string;
  page?: number;
  size?: number;
  target?: BookSearchTarget;
}

export type BookSearchTarget = 'title' | 'isbn' | 'publisher' | 'person';

export interface BookInstance {
  meta: BookMeta;
  documents: BookDocument[];
}

export interface BookMeta {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}

export interface BookDocument {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}
