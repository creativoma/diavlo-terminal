import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import { Terminal } from './Terminal.tsx';
import { Background } from './Background.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Background>
      <Terminal />
    </Background>
  </StrictMode>
);
