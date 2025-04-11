import '@radix-ui/themes/styles.css';
import './App.css.ts';
import { wrapper, header, heading, nav, list, item, main, linkActive } from './Layout.css.ts';
import { Outlet, useLocation } from 'react-router';

function App() {
  const location = useLocation();

  return (
    <div className={wrapper}>
      <header className={header}>
        <h1 className={`title1 ${heading}`}>certicos books</h1>
        <nav className={nav}>
          <ul className={`body1 ${list}`}>
            <li className={item}>
              <a
                href="/search"
                className={location.pathname.startsWith('/search') ? linkActive : ''}
              >
                도서 검색
              </a>
            </li>
            <li>
              <a
                href="/favorites"
                className={location.pathname.startsWith('/favorites') ? linkActive : ''}
              >
                내가 찜한 책
              </a>
            </li>
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
