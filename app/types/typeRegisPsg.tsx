export type RegisterPsikolog = {
  level_user: string;
  fullName:string;
  gender:'pria' | 'wanita' | '';
  religion: 'islam' | 'katolik' | 'prostestan' |'budha' | 'hindu' |'konghucu'|'';
  birthDate:string;
  lastEducation:string;
  caseHandled: string;
  aboutMe: string;
  legality:string;
  photo:string;
  email:string;
  phone:string;
  password:string;
}