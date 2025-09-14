import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { i18nInit } from './i18n';
import { ConfirmationDialogProvider } from '@/features/Confirmation/ConfirmationDialogProvider';
import { Provider } from 'react-redux';
import { setupStore } from './store';
import App from './App';

await i18nInit;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={setupStore({})}>
      <ConfirmationDialogProvider>
        <App />
      </ConfirmationDialogProvider>
    </Provider>
  </StrictMode>,
);
