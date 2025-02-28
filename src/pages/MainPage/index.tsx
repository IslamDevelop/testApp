
import { FiltersAndSort } from '../../features/employees/ui/FiltersAndSort';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.scss';
import { EmployeeList } from '../../features/employees/ui/EmployeesList';

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <h1>Список сотрудников</h1>
      <FiltersAndSort />
      <Link to="/add" className={styles.addButton}>
        Добавить сотрудника
      </Link>
      <EmployeeList />
    </div>
  );
};