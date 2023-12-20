import { http } from "#/utils/http"


const url = {
    login: () => '/auth/login',
    register: () => '/auth/register',
    register2: () => '/auth/register/psikolog'
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
    }
}

export const authRepository = {
    url,
    manipulateData
}