import { useState } from 'react';
import Dark from '../../Icons/Dark';
import './ThemeToggle.css';
import Light from '../../Icons/Light';

function ThemeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>(
    document.body.classList.contains('dark') ? 'dark' : 'light',
  );
  function toggleTheme() {
    if (mode == 'light') {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      setMode('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      setMode('light');
    }
  }
  return (
    <button onClick={toggleTheme} className='theme-btn'>
      {mode === 'light' ? <Dark /> : <Light />}
    </button>
  );
}

export default ThemeToggle;
