import { http } from "#/utils/http"


const url = {
    login: () => '/auth/login',
    register: () => '/auth/register',
    register2: () => '/auth/register/psikolog',
    photo: () => '/psikolog/upload',
    legality: () => '/psikolog/upload/legality',


}

const manipulateData = {
    login(data: any){
        return http.post(url.login()).send(data)
    },
    register(data:any){
        return http.post(url.register()).send(data)
    },
    register2(data:any){
        return http.post(url.register2()).send(data)
    },
    Photo(data:any) {
        const formData = new FormData();
        formData.append("file", data);
        return http.post(url.photo()).send(formData);
      },
    legality(data:any){
        const formData = new FormData();
        formData.append("file",data);
        return http.post(url.legality()).send(formData);
    }
}

export const authRepository = {
    url,
    manipulateData
}

