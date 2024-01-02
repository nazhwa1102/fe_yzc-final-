export type RegisterPsikolog = {
  level_user: '703f41b0-1004-4965-a3ff-9c71f5fc4f6f';
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