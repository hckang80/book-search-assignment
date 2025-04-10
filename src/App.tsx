import '@radix-ui/themes/styles.css';
import './App.css';
import { Outlet } from 'react-router';

function App() {
  return (
    <div>
      <header>
        <h1>certicos books</h1>
        <ul>
          <li>
            <a href="/search">도서 검색</a>
          </li>
          <li>
            <a href="/favorites">내가 찜한 책</a>
          </li>
        </ul>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
