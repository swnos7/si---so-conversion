import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import App from '@/App';
import '@/index.css';
import '@/styles/custom.css';
import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
