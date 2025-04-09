import '@radix-ui/themes/styles.css';
import './App.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBookSearch } from './api';
import { useDebounce } from './hooks';
import { DetailSearch } from './components';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDetailQuery, setSearchDetailQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<'title' | 'person' | 'publisher'>('title');
  const deferredSearchKeyword = useDebounce(searchQuery);

  const params = {
    query: searchDetailQuery || deferredSearchKeyword,
    target: searchTarget
  };

  const { data } = useQuery({
    queryKey: ['search', params],
    queryFn: () => fetchBookSearch(params),
    enabled: (deferredSearchKeyword || searchDetailQuery).trim().length > 0,
    staleTime: 1000 * 60 * 5
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value.trim());
  };

  const handleDetailSearch = (query: string, target: typeof searchTarget) => {
    setSearchQuery('');
    setSearchDetailQuery(query);
    setSearchTarget(target);
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
          <input
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="검색어를 입력하세요"
            className="search-input"
          />

          <DetailSearch onSubmit={handleDetailSearch} />
        </div>

        <div>
          {data?.meta.total_count ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            '검색된 결과가 없습니다.'
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
