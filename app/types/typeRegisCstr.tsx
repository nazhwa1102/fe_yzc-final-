export type RegisterCustomer = {
  level_user: string;
  fullName:string;
  gender:'pria' | 'wanita' | '';
  email:string;
  password:string;
  birth_date: Date;
  religion: 'islam' | 'katolik' | 'prostestan' |'budha' | 'hindu' |'konghucu'|'';
  phone:string;
  last_education:string;
}