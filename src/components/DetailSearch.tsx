import { useState, memo } from 'react';
import { Button, Popover, Select, Theme } from '@radix-ui/themes';
import { type BookSearchTarget, bookSearchTargets } from 'src/types';
import * as styles from './DetailSearch.css';
import { X } from 'lucide-react';
import { targetName } from 'src/lib/constant';

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
    <Theme>
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger>
          <Button className={styles.opener} variant="outline" color="gray">
            상세검색
          </Button>
        </Popover.Trigger>

        <Popover.Content maxWidth="360px" className={styles.popoverContent}>
          <SearchForm onSubmit={handleFormSubmit} />
          <Popover.Close>
            <button className={styles.popoverCloseButton}>
              <X size={20} color="#b1b8c0" />
            </button>
          </Popover.Close>
        </Popover.Content>
      </Popover.Root>
    </Theme>
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
      <div className={styles.inputGroup}>
        <TargetSelector target={target} onChange={setTarget} />
        <QueryInput query={query} onChange={setQuery} />
      </div>
      <Button className={styles.searchButton}>검색하기</Button>
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
      <Select.Trigger className={styles.targetSelect}>{targetName[target]}</Select.Trigger>
      <Select.Content className={styles.targetOption}>
        {bookSearchTargets
          .filter((searchTarget) => searchTarget !== target)
          .map((label) => (
            <Select.Item value={label} key={label}>
              {targetName[label]}
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

  return (
    <input
      className={`caption ${styles.queryInput}`}
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="검색어 입력"
    />
  );
});
QueryInput.displayName = 'QueryInput';

export default DetailSearch;
