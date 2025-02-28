export interface Employee {
  id: number;
  name: string;
  isArchive: boolean;
  role: 'cook' | 'waiter' | 'driver';
  phone: string;
  birthday: string;
}