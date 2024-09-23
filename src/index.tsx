import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App.tsx';
import App2 from './App2.tsx';
import App3 from './App3.tsx';
import App4 from './App4.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <App4 />
      <br></br>
      <hr></hr>
      <br></br>
      <App />
      <br></br>
      <hr></hr>
      <br></br>
      <App2 />
      <br></br>
      <hr></hr>
      <br></br>
      <App3 />
    </StrictMode>,
  );
}
