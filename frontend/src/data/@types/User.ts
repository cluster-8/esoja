export interface User {
  id: string;
  name: string;
  birthDate: Date;
  phone: string;
  email: string;
  gender: string;
  picture?: string;
  zipcode: string;
  createdAt?: Date;
  updateAt?: Date;
  deletedAt?: Date;
}
