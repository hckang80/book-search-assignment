import * as styles from './SearchHistory.css';
import { X } from 'lucide-react';

interface SearchHistoryProps {
  visible: boolean;
  history: string[];
  onSelect: (query: string) => void;
  onDelete: (query: string) => void;
}

const SearchHistory = ({ visible, history, onSelect, onDelete }: SearchHistoryProps) => {
  if (!visible || history.length === 0) return;

  return (
    <ul className={`palette-light-gray ${styles.list}`}>
      {history.map((item) => (
        <li className={`text-subtitle caption ${styles.item}`} key={item}>
          <button className={styles.label} onClick={() => onSelect(item)}>
            {item}
          </button>
          <button className={styles.deleteButton} onClick={() => onDelete(item)}>
            <X color="var(--palette-black)" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchHistory;
