import { useCallback, useEffect, useRef, useState } from 'react';
import { BookList, DetailSearch, NoData, SearchBar, SearchHistory } from '../components';
import type { BookSearchTarget } from '../types';
import { useInfiniteBookSearch } from '../hooks';
import { PAGE_SIZE } from '../lib/constant';
import * as styles from './PageLayout.css';
import { toReadableNumber } from '../lib/utils';
import { useSearchParams } from 'react-router';
import FadeLoader from 'react-spinners/FadeLoader';

const LOCAL_STORAGE_KEY = 'search_history';
const MAX_HISTORY_LENGTH = 8;

export default function BookSearch() {
  const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchAllContainerRef = useRef<HTMLDivElement | null>(null);
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
  const { data, isLoading } = infiniteQuery;

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
    resetSearchQuery();
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

  const handleClickOutside = useCallback(({ target }: MouseEvent) => {
    if (!(target instanceof Node) || searchAllContainerRef.current?.contains(target)) return;
    setShowHistory(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    document.addEventListener('mousedown', handleClickOutside, {
      signal: controller.signal
    });
    return () => {
      controller.abort();
    };
  }, [handleClickOutside]);

  return (
    <section>
      <h2 className={`title2 ${styles.heading}`}>도서 검색</h2>
      <div className={styles.wrapper}>
        <div className={styles.searchGroup} ref={searchAllContainerRef}>
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

      {isLoading ? (
        <FadeLoader className={styles.loader} />
      ) : (
        <div className={styles.searchResult}>
          <header className={styles.searchResultHeader}>
            <h3 className={styles.subHeading}>도서 검색 결과</h3>
            <div>
              총{' '}
              <span className="text-blue">{toReadableNumber(data?.pages[0].meta.total_count)}</span>
              건
            </div>
          </header>
          {data?.pages[0].meta.total_count ? (
            <BookList infiniteQuery={infiniteQuery} />
          ) : (
            <NoData />
          )}
        </div>
      )}
    </section>
  );
}
