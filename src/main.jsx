import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// OPTIMISATION CRITIQUE: Pas d'import CSS ici pour éviter render-blocking
// Le CSS critique est inline dans index.html

const container = document.getElementById('root');
const root = createRoot(container);

// OPTIMISATION: Mode concurrent pour de meilleures performances
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);