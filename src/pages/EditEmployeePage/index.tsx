import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store/store';
import { EmployeeForm } from '../../features/employees/ui/EmployeeForm';
import { updateEmployee } from '../../features/employees/model/employeesSlice';
import { Employee } from '../../entities/employee/types';

export const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const employees = useSelector((state: RootState) => state.employees.employees);
  const employee = employees.find((e) => e.id === Number(id));
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (updatedEmployee: Employee) => {
    dispatch(updateEmployee(updatedEmployee));
    navigate('/')
  };

  return (
    <div>
      <h1>Редактирование сотрудника</h1>
      {employee ? (
        <EmployeeForm employee={employee} onSubmit={handleSubmit} />
      ) : (
        <p>Сотрудник не найден</p>
      )}
    </div>
  );
};