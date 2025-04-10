import '@radix-ui/themes/styles.css';
import './App.css';
import { useState } from 'react';
import { BookList, DetailSearch, SearchHistory } from './components';
import { bookSearchTargets, type BookSearchTarget } from './types';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useInfiniteBookSearch } from './hooks';
import { PAGE_SIZE } from './lib/constant';

const LOCAL_STORAGE_KEY = 'search_history';
const MAX_HISTORY_LENGTH = 8;

function App() {
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
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearchQuery(value);
  };

  const resetSearchQuery = () => {
    setValue('');
    setSearchQuery('');
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
    <div>
      <header>
        <h1>certicos books</h1>
        <ul>
          <li>
            <a href="#">도서 검색</a>
          </li>
          <li>
            <a href="#">내가 찜한 책</a>
          </li>
        </ul>
      </header>

      <main>
        <div>
          <form onSubmit={handleFormSubmit}>
            <TextField.Root
              value={value}
              onChange={handleInputChange}
              onFocus={() => setShowHistory(true)}
              placeholder="검색어를 입력하세요"
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </form>

          <SearchHistory
            visible={showHistory}
            history={history}
            onSelect={handleHistorySelect}
            onDelete={handleDeleteHistory}
          />

          <DetailSearch onSubmit={applyDetailSearch} />
        </div>

        <div>
          {data?.pages.length ? (
            <BookList query={queryText} params={params} />
          ) : (
            <p>검색된 결과가 없습니다.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
