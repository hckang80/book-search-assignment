import { useEffect, useState } from 'react';
import { BookList, DetailSearch, NoData, SearchBar, SearchHistory } from '../components';
import type { BookSearchTarget } from '../types';
import { useInfiniteBookSearch } from '../hooks';
import { PAGE_SIZE } from '../lib/constant';
import * as styles from './BookSearch.css';
import { toReadableNumber } from '../lib/utils';
import { useSearchParams } from 'react-router';

const LOCAL_STORAGE_KEY = 'search_history';
const MAX_HISTORY_LENGTH = 8;

export default function BookSearch() {
  const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);

  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>(storedHistory ? JSON.parse(storedHistory) : []);
  const [showHistory, setShowHistory] = useState(false);

  const searchQuery = (searchParams.get('query') || '').trim();
  const searchTarget = searchParams.get('target') as BookSearchTarget | null;

  useEffect(() => {
    searchParams.set('query', searchQuery);

    if (searchTarget) {
      searchParams.set('target', searchTarget);
    } else {
      searchParams.delete('target');
    }
  }, [searchParams, searchQuery, searchTarget]);

  const params = {
    query: searchQuery,
    target: searchTarget,
    size: PAGE_SIZE
  };

  const infiniteQuery = useInfiniteBookSearch(searchQuery, params);
  const { data } = infiniteQuery;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value.trim());
  };

  const updateHistory = (query: string) => {
    setHistory((prev) => {
      const updated = [...new Set([...prev, query])].slice(-MAX_HISTORY_LENGTH);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const submitSearchQuery = (query: string) => {
    if (!query) return;
    updateHistory(query);
    setSearchParams({ query });
    setShowHistory(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearchQuery(value);
  };

  const resetSearchQuery = () => {
    setValue('');
  };

  const applyDetailSearch = (query: string, target: BookSearchTarget) => {
    resetSearchQuery();
    setSearchParams({ query, target });
  };

  const handleHistorySelect = (query: string) => {
    setValue(query);
    submitSearchQuery(query);
  };

  const handleDeleteHistory = (query: string) => {
    const updated = history.filter((item) => item !== query);
    setHistory(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <section>
      <h2 className={`title2 ${styles.heading}`}>도서 검색</h2>
      <div className={styles.wrapper}>
        <div className={styles.searchGroup}>
          <SearchBar
            value={value}
            onChange={handleInputChange}
            onSubmit={handleFormSubmit}
            onFocus={() => setShowHistory(true)}
          />

          <SearchHistory
            visible={showHistory}
            history={history}
            onSelect={handleHistorySelect}
            onDelete={handleDeleteHistory}
          />
        </div>

        <DetailSearch onSubmit={applyDetailSearch} />
      </div>

      <div className={styles.searchResult}>
        <header className={styles.searchResultHeader}>
          <div>도서 검색 결과</div>
          <div>
            총{' '}
            <span className="text-blue">{toReadableNumber(data?.pages[0].meta.total_count)}</span>건
          </div>
        </header>
        {data?.pages.length ? <BookList infiniteQuery={infiniteQuery} /> : <NoData />}
      </div>
    </section>
  );
}
