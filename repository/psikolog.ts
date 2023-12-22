import { http } from "#/utils/http"
import useSWR from "swr"


const url = {
    psikolog: () => '/psikolog',
    psikologId: (id:any) => '/psikolog/:id',
    psikologImage: () => '/psikolog/upload'
}

const manipulateData = {
    create(data: any){
        return http.post(url.psikolog()).send(data)
    },
    update(data:any,id:any){
        return http.put(url.psikologId(id)).send(data)
    },
    delete(data: any, id:any){
        return http.del(url.psikologId(id)).send(data)
    },
    PsikologProfile(data:any){
      const formData = new FormData()
      formData.append("file", data)
      return http.post(url.psikologImage()).send(formData)
  },
}

const hooks = {
  get(){
    return useSWR(url.psikolog(), http.fetcher)
  },
  getById(id:any){
    return useSWR(url.psikologId(id), http.fetcher)
  }
}

export const PsikologRepository = {
    url,
    manipulateData,
    hooks
}
