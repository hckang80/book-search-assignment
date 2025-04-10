import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { wrapper } from './SearchBar.css.ts';

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
          <MagnifyingGlassIcon height="30" width="30" color="var(--text-primary)" />
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
};

export default SearchBar;
