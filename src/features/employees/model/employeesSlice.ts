import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Employee } from "../../../entities/employee/types";
import { RootState } from "../../../app/store/store";

interface EmployeesState {
  employees: Employee[];
  filters: {
    role: "cook" | "waiter" | "driver" | "";
    isArchive: boolean;
  };
  sort: "name" | "birthday" | "";
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  filters: {
    role: "",
    isArchive: false,
  },
  sort: "",
  loading: false,
  error: null,
};


export const fetchEmployees = createAsyncThunk<
  Employee[],
  void,
  { rejectValue: string }
>("employees/fetchEmployees", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/employees.json");
    if (!response.ok) {
      throw new Error("Ошибка при загрузке данных");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Ошибка при загрузке данных");
  }
});


const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      const newEmployee = { ...action.payload, id: Date.now() };
      state.employees = [...state.employees, newEmployee]; 
    },
    setRoleFilter: (
      state,
      action: PayloadAction<"cook" | "waiter" | "driver" | "">
    ) => {
      state.filters.role = action.payload;
    },
    toggleArchiveFilter: (state) => {
      state.filters.isArchive = !state.filters.isArchive;
    },
    setSort: (state, action: PayloadAction<"name" | "birthday" | "">) => {
      state.sort = action.payload;
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (e) => e.id === action.payload.id
      );
      console.log(state.employees)
      console.log(state)
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.error = action.payload || "Ошибка при загрузке данных";
        state.loading = false;
      });
  },
});

export const {
  setRoleFilter,
  addEmployee,
  toggleArchiveFilter,
  setSort,
  updateEmployee,
} = employeesSlice.actions;
export const employeesReducer = employeesSlice.reducer;

const selectEmployees = (state: RootState) => state.employees.employees;
const selectFilters = (state: RootState) => state.employees.filters;
const selectSort = (state: RootState) => state.employees.sort;

export const selectFilteredEmployees = createSelector(
  [selectEmployees, selectFilters, selectSort],
  (employees, filters, sort) => {
    let filteredEmployees = employees.filter((employee) => {
      const matchesRole = filters.role ? employee.role === filters.role : true;
      const matchesArchive = filters.isArchive ? true : !employee.isArchive;
      return matchesRole && matchesArchive;
    });

    if (sort === "name") {
      filteredEmployees = [...filteredEmployees].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sort === "birthday") {
      filteredEmployees = [...filteredEmployees].sort(
        (a, b) =>
          new Date(a.birthday).getTime() - new Date(b.birthday).getTime()
      );
    }

    return filteredEmployees;
  }
);
