
import { RouteObject } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage';
import { EditEmployeePage } from '../../pages/EditEmployeePage';
import { AddEmployeePage } from '../../pages/AddEmployeePage';

export const routes: RouteObject[] = [
  { path: '/', element: <MainPage /> },
  { path: '/edit/:id', element: <EditEmployeePage /> },
  { path: '/add', element: <AddEmployeePage /> },
];