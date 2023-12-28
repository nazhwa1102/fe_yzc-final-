export type RegisterPsikolog = {
  level_user: string;
  fullName:string;
  gender:'pria' | 'wanita' | '';
  religion: 'Islam' | 'Katolik' | 'Prostestan' |'Budha' | 'Hindu' |'Konghucu'|'';
  birth_date:Date;
  last_education:string;
  caseHandled: string;
  aboutMe: string;
  legality:string;
  photo:string;
  email:string;
  phone:string;
  password:string;
}