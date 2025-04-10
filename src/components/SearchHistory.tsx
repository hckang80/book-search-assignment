interface SearchHistoryProps {
  visible: boolean;
  history: string[];
  onSelect: (query: string) => void;
  onDelete: (query: string) => void;
}

const SearchHistory = ({ visible, history, onSelect, onDelete }: SearchHistoryProps) => {
  if (!visible || history.length === 0) return;

  return (
    <ul>
      {history.map((item) => (
        <li key={item}>
          <button onClick={() => onSelect(item)}>{item}</button>
          <button onClick={() => onDelete(item)}>삭제</button>
        </li>
      ))}
    </ul>
  );
};

export default SearchHistory;
