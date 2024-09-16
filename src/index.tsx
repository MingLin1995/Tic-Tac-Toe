import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App.tsx';
import App2 from './App2.tsx';

const rootElement = document.getElementById('root');
const rootElement2 = document.getElementById('root2');

if (rootElement && rootElement2) {
  const root = createRoot(rootElement);
  const root2 = createRoot(rootElement2);

  root.render(
    <StrictMode>
      <App />
      <br></br>
      <hr></hr>
      <br></br>

      <App2 />
    </StrictMode>,
  );
}
