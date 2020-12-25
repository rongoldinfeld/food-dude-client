export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  address: {
    area: string;
    city: string;
    street: string;
    houseNumber: number;
  };
}
