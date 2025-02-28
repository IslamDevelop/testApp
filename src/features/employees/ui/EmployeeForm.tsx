import { useForm, Controller } from "react-hook-form";
import { Employee } from "../../../entities/employee/types";

import styles from "./EmployeeForm.module.scss";

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employee: Employee) => void;
}

export const EmployeeForm = ({ employee, onSubmit }: EmployeeFormProps) => {
  const { control, handleSubmit } = useForm<Employee>({
    defaultValues: employee || {
      id: 0,
      name: "",
      role: "cook",
      phone: "",
      birthday: "",
      isArchive: false,
    },
  });

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Имя</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Имя" required />
          )}
        />

        <label>Телефон</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Телефон" required />
          )}
        />

        <label>Дата рождения</label>
        <Controller
          name="birthday"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="дд.мм.гггг" required />
          )}
        />

        <label>Должность</label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <select {...field} required>
              <option value="cook">Повар</option>
              <option value="waiter">Официант</option>
              <option value="driver">Водитель</option>
            </select>
          )}
        />

        <label>
          <Controller
            name="isArchive"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                checked={field.value} 
                onChange={(e) => field.onChange(e.target.checked)} 
              />
            )}
          />
          В архиве
        </label>

        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};
