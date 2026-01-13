import { http } from "#/utils/http"
import useSWR from "swr"


const url = {
    user_yzc: () => '/user_yzc',
    user_yzcPsikolog: () => '/user_yzc.psikolog',
    user_yzcCustomer: () => '/user_yzc/customer',
    user_yzcId: (id:any) => '/user_yzc/:id',
    user_yzcActive: (id:any) => `/user_yzc/active/${id}`,
    user_yzcInActive: (id:any) => `/user_yzc/inactive/${id}`,

}

const manipulateData = {
    create(data: any){
        return http.post(url.user_yzc()).send(data)
    },
    update(data:any,id:any){
        return http.put(url.user_yzcId(id)).send(data)
    },
    delete(data: any, id:any){
        return http.del(url.user_yzcId(id)).send(data)
    },
    userInActive(id:any, data:any){
        return http.put(url.user_yzcInActive(id)).send(data)
    },
    userActive(id:any){
        return http.put(url.user_yzcActive(id))
    }
}

const hooks = {
  get(){
    return useSWR(url.user_yzc(), http.fetcher)
  },
  getPsikolog(){
    return useSWR(url.user_yzc(), http.fetcher)
  },
  getCustomer(){
    return useSWR(url.user_yzc(), http.fetcher)
  },
  getById(id:any){
    return useSWR(url.user_yzcId(id), http.fetcher)
  },
}

export const UserYzcRepository = {
    url,
    manipulateData,
    hooks
}
