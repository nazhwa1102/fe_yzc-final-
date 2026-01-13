import { http } from "#/utils/http"
import useSWR from "swr"


const url = {
    private_konseling: () => '/private_konseling',
    private_konselingId: (id:any) => `/private_konseling/${id}`,
    reject: (id:any) => `/private_konseling/reject/${id}`,
    approve: (id: any) => `/private_konseling/approve/${id}`,
    statusApprovePsi: (id:any) => `/private_konseling/approve/${id}`,
    statusRejectPsi: (id:any) => `/private_konseling/reject/${id}`,
    statusPendingPsi: (id:any) => `/private_konseling/pending/${id}`
}

const manipulateData = {
    create(data: any){
        return http.post(url.private_konseling()).send(data)
    },
    update(data:any, id:any){
        return http.put(url.private_konselingId(id)).send(data)
    },
    delete(id:any){
        return http.del(url.private_konselingId(id))
    },
    reject(data:any, id:any){
        return http.put(url.reject(id)).send(data)
    },
    approve(id:any){
        return http.put(url.approve(id))
    },
}

const hooks = {
  get(){
    return useSWR(url.private_konseling(), http.fetcher)
  },
  getById(id: any){
    return useSWR(url.private_konselingId(id), http.fetcher)
  },
  statusApprovePsi(id:any){
    return useSWR(url.statusApprovePsi(id), http.fetcher)
  },
  statusRejectPsi(id:any){
    return useSWR(url.statusRejectPsi(id), http.fetcher)
  },
  statusPendingPsi(id:any){
    return useSWR(url.statusPendingPsi(id), http.fetcher)
  }
}

export const PrivateKonselingRepository = {
    url,
    manipulateData,
    hooks
}
