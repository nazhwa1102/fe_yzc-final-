import { http } from "#/utils/http"
import useSWR from "swr"


const url = {
    seminar: () => '/seminar',
    seminarId: (id:any) => `/seminar/${id}`,
    image: () => '/seminar/upload',
    reject: (id:any, seminar: any) => `/seminar/reject/${seminar}/${id}`,
    approve: (id: any, seminar: any) => `/seminar/approve/${seminar}/${id}`,
    statusApprovePsi: (id:any) => `/seminar/approve/${id}`,
    statusRejectPsi: (id:any) => `/seminar/reject/${id}`,
    statusPendingPsi: (id:any) => `/seminar/pending/${id}`,
    statusApprove: () => '/seminar/approve',
    statusReject: () => '/seminar/reject',
    statusPending: () => '/seminar/pending',
    statusFull: () => '/seminar/full',
    statusDone: () => '/seminar/done',
    approval: (id: any) => `/seminar/approval/${id}`,
    done: (id:any)=> `/seminar/done/${id}`,
    seminarRekomen: () => `/seminar/seminar_rekomen`
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
    reject(data:any, id:any, seminar: any){
        return http.put(url.reject(id, seminar)).send(data)
    },
    approve(id:any, seminar: any){
        return http.put(url.approve(id, seminar))
    },
    UploadImage(data:any){
        const formData = new FormData()
        formData.append("file", data)
        return http.post(url.image()).send(formData)
    },
    approval(id: any){
      return http.put(url.approval(id))
    },
    done(id:any){
      return http.put(url.done(id))
    }
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
  statusFull(){
    return useSWR(url.statusFull(), http.fetcher)
  },
  statusDone(){
    return useSWR(url.statusDone(), http.fetcher)
  },
  statusApprovePsi(id:any){
    return useSWR(url.statusApprovePsi(id), http.fetcher)
  },
  statusRejectPsi(id:any){
    return useSWR(url.statusRejectPsi(id), http.fetcher)
  },
  statusPendingPsi(id:any){
    return useSWR(url.statusPendingPsi(id), http.fetcher)
  },
  detailSeminar(id:any){
    return useSWR(url.seminarId(id), http.fetcher)
  },
  seminarRekomen(){
    return useSWR(url.seminarRekomen(), http.fetcher)
  }
}

export const SeminarRepository = {
    url,
    manipulateData,
    hooks
}
