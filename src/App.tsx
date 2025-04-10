import '@radix-ui/themes/styles.css';
import './App.css.ts';
import * as styles from './Layout.css.ts';
import { Outlet } from 'react-router';

const { wrapper, header, heading, nav, list, item, main } = styles;

function App() {
  return (
    <div className={wrapper}>
      <header className={header}>
        <h1 className={`title1 ${heading}`}>certicos books</h1>
        <nav className={nav}>
          <ul className={`body1 ${list}`}>
            <li className={item}>
              <a href="/search">도서 검색</a>
            </li>
            <li>
              <a href="/favorites">내가 찜한 책</a>
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
