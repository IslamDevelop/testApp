import { useForm, Controller } from "react-hook-form";
import { Employee } from "../../../entities/employee/types";
import styles from "./EmployeeForm.module.scss";
import { InputMask } from "@react-input/mask";

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employee: Employee) => void;
}

export const EmployeeForm = ({ employee, onSubmit }: EmployeeFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<Employee>({
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
          rules={{
            required: "Телефон обязателен",
            pattern: {
              value: /^\+7\s\(\d{3}\)\s\d{3}-\d{4}$/, 
              message: "Введите в формате +7(999) 999-9999", 
            },
          }}
          render={({ field }) => (
            <InputMask mask="+7 (___) ___-____" replacement={{ _: /\d/ }} placeholder="+7(999) 999-9999" {...field} />
          )}
        />
        {errors.phone && (
              <p style={{ color: "red" }}>{errors.phone.message}</p>
            )}
         

        <label>Дата рождения</label>
        <Controller
          name="birthday"
          control={control}
          rules={{
            required: "Введите дату рождения",
            pattern: {
              value: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
              message: "Некорректный формат даты (дд.мм.гггг)",
            },
          }}
          render={({ field }) => (
            <InputMask type="data" mask="__.__.____" {...field} replacement={{ _: /\d/ }} placeholder="дд.мм.гггг"  />
            
          )}
        />
        {errors.birthday && (
              <p style={{ color: "red" }}>{errors.birthday.message}</p>
            )}

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
