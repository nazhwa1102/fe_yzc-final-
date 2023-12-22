import { http } from "#/utils/http"
import useSWR from "swr"


const url = {
    seminar: () => '/seminar',
    seminarId: (id:any) => `/seminar/${id}`,
    image: () => '/seminar/upload',
    reject: (id:any) => `/seminar/reject/${id}`,
    approve: (id: any) => `/seminar/approve/${id}`,
    statusApprove: () => '/seminar/approve',
    statusReject: () => '/seminar/reject',
    statusPending: () => '/seminar/pending',
    detailSeminar: (id: any) => `/seminar/${id}`,
}

const manipulateData = {
    create(data: any){
        return http.post(url.seminar()).send(data)
    },
    update(data:any, id:any){
        return http.put(url.seminarId(id)).send(data)
    },
    delete(id:any){
        return http.del(url.seminarId(id))
    },
    reject(data:any, id:any){
        return http.put(url.reject(id)).send(data)
    },
    approve(data:any, id:any){
        return http.put(url.approve(id)).send(data)
    },
    UploadImage(data:any){
        const formData = new FormData()
        formData.append("file", data)
        return http.post(url.image()).send(formData)
    },
}

const hooks = {
  get(){
    return useSWR(url.seminar(), http.fetcher)
  },
  getById(id: any){
    return useSWR(url.seminarId(id), http.fetcher)
  },
  getImage(){
    return useSWR(url.image(), http.fetcher)
  },
  statusApprove(){
    return useSWR(url.statusApprove(), http.fetcher)
  },
  statusReject(){
    return useSWR(url.statusReject(), http.fetcher)
  },
  statusPending(){
    return useSWR(url.statusPending(), http.fetcher)
  },
  detailSeminar(id:any){
    return useSWR(url.detailSeminar(id), http.fetcher)
  }
}

export const SeminarRepository = {
    url,
    manipulateData,
    hooks
}
