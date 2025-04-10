import { TextField } from '@radix-ui/themes';
import { wrapper, icon } from './SearchBar.css.ts';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFocus: () => void;
}

const SearchBar = ({ value, onChange, onSubmit, onFocus }: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField.Root
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="검색어를 입력하세요"
        className={`palette-light-gray caption ${wrapper}`}
      >
        <TextField.Slot>
          <Search className={icon} size={30} color="var(--text-primary)" />
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
};

export default SearchBar;
