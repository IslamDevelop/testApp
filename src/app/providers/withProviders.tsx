import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { store } from '../store/store';


export const withProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};