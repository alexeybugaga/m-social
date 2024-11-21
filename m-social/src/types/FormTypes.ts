export interface IFormValues {
  firstName: string;
  city: string;
  password: string;
  confirmpassword: string;
  email?: string;
  phone?: string | null;
  agreement?: boolean;
}
