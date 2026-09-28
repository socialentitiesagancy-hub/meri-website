import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { setServerInitialData, type InitialData } from './services/initialData';
import { serviceDirectory } from './pages/ServiceDetail';
import { locationDirectory } from './pages/LocationDetail';

export const serviceIds = Object.keys(serviceDirectory);
export const locationIds = Object.keys(locationDirectory);

export function render(url: string, data: InitialData): string {
  setServerInitialData(data);
  return renderToString(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
}
