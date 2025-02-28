import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { selectFilteredEmployees } from "../model/employeesSlice";
import styles from "./EmployeeList.module.scss";
import { useNavigate } from "react-router-dom";

export const EmployeeList = () => {
  const employees = useSelector(selectFilteredEmployees);
  const loading = useSelector((state: RootState) => state.employees.loading);
  const error = useSelector((state: RootState) => state.employees.error);
  const navigate = useNavigate();
  //  useEffect(() => {
  //   console.log('Cписок обновился')
  //  },[employees])
  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.employeeList}>
      {employees.map((employee) => (
        <div
          onClick={() => navigate(`edit/${employee.id}`)}
          key={employee.id}
          className={styles.employeeItem}
        >
          <div className={styles.employeeOne}>
          <span className={styles.employeeName}>{employee.name}</span>
          <span className={styles.employeeRole}>{employee.role == 'cook' ? 'Повар' : employee.role == 'driver' ? 'Водитель' : 'Официант'}</span>
          </div>
          {employee.isArchive && (
            <span className={styles.employeeArchive}>В архиве</span>
          )}
          <span className={styles.employeePhone}>{employee.phone}</span>
        </div>
      ))}
    </div>
  );
};
