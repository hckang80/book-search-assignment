import { TextField } from '@radix-ui/themes';
import { form, wrapper, icon } from './SearchBar.css.ts';
import { Search } from 'lucide-react';
import clsx from 'clsx';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFocus: () => void;
}

const SearchBar = ({ value, onChange, onSubmit, onFocus }: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit} className={form}>
      <TextField.Root
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="검색어를 입력하세요"
        className={clsx('palette-light-gray', 'caption', wrapper)}
      >
        <TextField.Slot>
          <Search className={icon} size={30} color="var(--text-primary)" />
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
};

export default SearchBar;
