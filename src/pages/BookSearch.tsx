import { useState } from 'react';
import { BookList, DetailSearch, SearchBar, SearchHistory } from '../components';
import { bookSearchTargets, type BookSearchTarget } from '../types';
import { useInfiniteBookSearch } from '../hooks';
import { PAGE_SIZE } from '../lib/constant';
import * as styles from './BookSearch.css';
import ICON_BOOK from '../assets/icon_book.svg';

const LOCAL_STORAGE_KEY = 'search_history';
const MAX_HISTORY_LENGTH = 8;

export default function BookSearch() {
  const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);

  const [value, setValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDetailQuery, setSearchDetailQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<BookSearchTarget>(bookSearchTargets[0]);
  const [history, setHistory] = useState<string[]>(storedHistory ? JSON.parse(storedHistory) : []);
  const [showHistory, setShowHistory] = useState(false);

  const queryText = (searchDetailQuery || searchQuery).trim();
  const params = {
    query: queryText,
    target: searchTarget,
    size: PAGE_SIZE
  };

  const { data } = useInfiniteBookSearch(queryText, params);

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
    setSearchQuery(query);
    setShowHistory(false);
    resetDetailSearchQuery();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearchQuery(value);
  };

  const resetSearchQuery = () => {
    setValue('');
    setSearchQuery('');
  };

  const resetDetailSearchQuery = () => {
    setSearchDetailQuery('');
    setSearchTarget(bookSearchTargets[0]);
  };

  const applyDetailSearch = (query: string, target: BookSearchTarget) => {
    resetSearchQuery();
    setSearchDetailQuery(query);
    setSearchTarget(target);
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
            총 <span className="text-blue">{data?.pages[0].meta.total_count || 0}</span>건
          </div>
        </header>
        {data?.pages.length ? (
          <BookList query={queryText} params={params} />
        ) : (
          <div className={styles.noData}>
            <img className={styles.noDataIcon} src={ICON_BOOK} alt="" />
            <p className={`text-secondary caption ${styles.noDataText}`}>검색된 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
