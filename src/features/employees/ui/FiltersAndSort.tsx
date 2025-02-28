import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store/store';
import { setRoleFilter, toggleArchiveFilter, setSort } from '../model/employeesSlice';
import styles from './FiltersAndSort.module.scss';

export const FiltersAndSort = () => {
  const dispatch = useDispatch();
  const { filters, sort } = useSelector((state: RootState) => state.employees);

  return (
    <div className={styles.filtersContainer}>
      <select
        value={filters.role}
        onChange={(e) =>
          dispatch(setRoleFilter(e.target.value as 'cook' | 'waiter' | 'driver' | ''))
        }
      >
        <option value="">Все должности</option>
        <option value="cook">Повар</option>
        <option value="waiter">Официант</option>
        <option value="driver">Водитель</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={filters.isArchive}
          onChange={() => dispatch(toggleArchiveFilter())}
        />
        Показать архивных
      </label>
      <select
        value={sort}
        onChange={(e) =>
          dispatch(setSort(e.target.value as 'name' | 'birthday' | ''))
        }
      >
        <option value="">Без сортировки</option>
        <option value="name">По имени</option>
        <option value="birthday">По дате рождения</option>
      </select>
    </div>
  );
};