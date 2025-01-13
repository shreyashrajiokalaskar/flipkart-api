export interface IPincode {
  id?: string;
  pincode: number;
  name: string;
  district: string;
  state: string;
}

export interface IEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
