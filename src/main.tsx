import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { withProviders } from './app/providers/withProviders';
import { store } from './app/store/store.ts';
import { fetchEmployees } from './features/employees/model/employeesSlice.ts';
import './index.scss'

store.dispatch(fetchEmployees());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {withProviders({ children: <App /> })}
  </React.StrictMode>,
);