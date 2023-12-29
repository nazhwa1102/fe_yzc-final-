export type RegisterCustomer = {
  level_user: string;
  fullName:string;
  gender:'pria' | 'wanita' | '';
  email:string;
  password:string;
  birthDate:string;
  religion: 'islam' | 'katolik' | 'prostestan' |'budha' | 'hindu' |'konghucu'|'';
  phone:string;
  lastEducation:string;
}