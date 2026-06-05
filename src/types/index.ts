export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  operating_hours: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  preferredStore: string;
  preferredDate: string;
}
