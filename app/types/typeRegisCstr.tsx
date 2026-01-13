export type RegisterCustomer = {
  level_user: '2b9814f9-befa-41e4-9f95-1f759b411801';
  fullName:string;
  gender:'pria' | 'wanita' | '';
  email:string;
  password:string;
  birth_date: Date;
  religion: 'islam' | 'katolik' | 'prostestan' |'budha' | 'hindu' |'konghucu'|'';
  phone:string;
  last_education:string;
}