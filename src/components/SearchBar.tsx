import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

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
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
};

export default SearchBar;
