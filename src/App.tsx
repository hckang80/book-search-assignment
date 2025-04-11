import '@radix-ui/themes/styles.css';
import './App.css.ts';
import { wrapper, header, heading, nav, list, item, main, linkActive } from './Layout.css.ts';
import { Link, Outlet, useLocation } from 'react-router';

function App() {
  const location = useLocation();

  const navigation = [
    { path: '/search', label: '도서 검색' },
    { path: '/favorites', label: '내가 찜한 책' }
  ];

  return (
    <div className={wrapper}>
      <header className={header}>
        <h1 className={`title1 ${heading}`}>certicos books</h1>
        <nav className={nav}>
          <ul className={`body1 ${list}`}>
            {navigation.map((nav) => (
              <li key={nav.path} className={item}>
                <Link
                  to={nav.path}
                  className={location.pathname.startsWith(nav.path) ? linkActive : ''}
                >
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className={main}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
