import '@radix-ui/themes/styles.css';
import './App.css.ts';
import * as styles from './Layout.css.ts';
import { Link, Outlet, useLocation } from 'react-router';

function App() {
  const location = useLocation();

  const navigation = [
    { path: '/search', label: '도서 검색' },
    { path: '/favorites', label: '내가 찜한 책' }
  ];

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={`title1 ${styles.heading}`}>certicos books</h1>
        <nav className={styles.nav}>
          <ul className={`body1 ${styles.list}`}>
            {navigation.map(({ path, label }) => (
              <li key={path} className={styles.item}>
                <Link
                  to={path}
                  className={location.pathname.startsWith(path) ? styles.linkActive : ''}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
