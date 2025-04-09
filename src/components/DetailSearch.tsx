import { useState, memo } from 'react';
import { Button, Popover, Select } from '@radix-ui/themes';
import { type BookSearchTarget, bookSearchTargets } from '../types';

interface DetailSearchProps {
  onSubmit: (query: string, target: 'title' | 'person' | 'publisher') => void;
}

const DetailSearch = ({ onSubmit }: DetailSearchProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleFormSubmit = (query: string, target: BookSearchTarget) => {
    setOpen(false);
    onSubmit(query.trim(), target);
  };

  return (
    <>
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger>
          <Button>상세검색</Button>
        </Popover.Trigger>

        <Popover.Content maxWidth="450px">
          <SearchForm onSubmit={handleFormSubmit} />
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

interface SearchFormProps {
  onSubmit: (query: string, target: BookSearchTarget) => void;
}

const SearchForm = memo(({ onSubmit }: SearchFormProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit(query, target);
  };

  const [target, setTarget] = useState<BookSearchTarget>(bookSearchTargets[0]);
  const [query, setQuery] = useState('');

  return (
    <form onSubmit={handleFormSubmit}>
      <TargetSelector target={target} onChange={setTarget} />
      <QueryInput query={query} onChange={setQuery} />
      <Button>검색하기</Button>
    </form>
  );
});
SearchForm.displayName = 'SearchForm';

interface TargetSelectorProps {
  target: BookSearchTarget;
  onChange: (value: BookSearchTarget) => void;
}

const TargetSelector = memo(({ target, onChange }: TargetSelectorProps) => {
  return (
    <Select.Root value={target} onValueChange={onChange}>
      <Select.Trigger>{target}</Select.Trigger>
      <Select.Content>
        {bookSearchTargets.map((label) => (
          <Select.Item value={label} key={label}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
});
TargetSelector.displayName = 'TargetSelector';

interface QueryInputProps {
  query: string;
  onChange: (value: string) => void;
}

const QueryInput = memo(({ query, onChange }: QueryInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <input type="text" value={query} onChange={handleChange} placeholder="검색어 입력" />;
});
QueryInput.displayName = 'QueryInput';

export default DetailSearch;
