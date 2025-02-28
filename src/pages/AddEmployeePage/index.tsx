import { EmployeeForm } from "../../features/employees/ui/EmployeeForm";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../features/employees/model/employeesSlice";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../entities/employee/types";

export const AddEmployeePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (employee: Employee) => {
    dispatch(addEmployee(employee));
    navigate("/");
  };

  return (
    <div>
      <h1>Добавить сотрудника</h1>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
};
