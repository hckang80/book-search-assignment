import { useState } from 'react';
import { Button, Popover, Select } from '@radix-ui/themes';

interface DetailSearchProps {
  onSubmit: (query: string, target: 'title' | 'person' | 'publisher') => void;
}

const DetailSearch = ({ onSubmit }: DetailSearchProps) => {
  const [target, setTarget] = useState<'title' | 'person' | 'publisher'>('title');
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
            <Select.Root value={target} onValueChange={(val) => setTarget(val as typeof target)}>
              <Select.Trigger>{target}</Select.Trigger>
              <Select.Content>
                <Select.Item value="title">제목</Select.Item>
                <Select.Item value="person">저자명</Select.Item>
                <Select.Item value="publisher">출판사</Select.Item>
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
