import '@radix-ui/themes/styles.css';
import './App.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBookSearch } from './api';
import { DetailSearch } from './components';
import { bookSearchTargets, type BookSearchTarget } from './types';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

function App() {
  const [value, setValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDetailQuery, setSearchDetailQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<BookSearchTarget>(bookSearchTargets[0]);

  const params = {
    query: searchDetailQuery || searchQuery,
    target: searchTarget
  };

  const { data } = useQuery({
    queryKey: ['search', params],
    queryFn: () => fetchBookSearch(params),
    enabled: (searchQuery || searchDetailQuery).trim().length > 0,
    staleTime: 1000 * 60 * 5
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value.trim());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    setSearchQuery(value);
  };

  const handleDetailSearch = (query: string, target: typeof searchTarget) => {
    setValue('');
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
          <form onSubmit={handleFormSubmit}>
            <TextField.Root
              value={value}
              onChange={handleInputChange}
              placeholder="검색어를 입력하세요"
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </form>

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
