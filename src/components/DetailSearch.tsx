import { useState } from 'react';
import { Button, Popover, Select } from '@radix-ui/themes';
import { type BookSearchTarget, bookSearchTargets } from '../types';

interface DetailSearchProps {
  onSubmit: (query: string, target: 'title' | 'person' | 'publisher') => void;
}

const DetailSearch = ({ onSubmit }: DetailSearchProps) => {
  const [target, setTarget] = useState<BookSearchTarget>(bookSearchTargets[0]);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setOpen((open) => !open);
    onSubmit(query.trim(), target);
  };

  return (
    <>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <Button>상세검색</Button>
        </Popover.Trigger>

        <Popover.Content maxWidth="450px">
          <form onSubmit={handleSubmit}>
            <Select.Root value={target} onValueChange={(val: BookSearchTarget) => setTarget(val)}>
              <Select.Trigger>{target}</Select.Trigger>
              <Select.Content>
                {bookSearchTargets.map((label) => (
                  <Select.Item value={label} key={label}>
                    {label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어 입력"
            />
            <Button>검색하기</Button>
          </form>
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

export default DetailSearch;
