import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './i18n';
import { ConfirmationDialogProvider } from '@/features/Confirmation/ConfirmationDialogProvider';
import { Provider } from 'react-redux';
import { setupStore } from './store';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={setupStore({})}>
      <ConfirmationDialogProvider>
        <BrowserRouter basename={BASE_PATH || '/'}>
          <App />
        </BrowserRouter>
      </ConfirmationDialogProvider>
    </Provider>
  </StrictMode>,
);
