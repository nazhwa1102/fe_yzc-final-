import { http } from "#/utils/http"
import useSWR from "swr"


const url = {
    transaksiSeminar: () => '/transaksi',
    transaksiId: (id:any) => `/transaksi/${id}`,
    cusToAd: () => '/transaksi/CusToAd',
    adToPsi: () => '/transaksi/AdToPsi',
    image: () => '/transaksi/upload',
    reject: (id: any) => `/transaksi/reject/${id}`,
    approve: (id:any) => `/transaksi/approve/${id}`,
    approvepk: (id:any) => `/transaksi/approvepk/${id}`,
    done: (id: any) => `/transaksi/done/:id`,
    seminar: () => '/transaksi/seminar',
    seminarApprove: () => '/transaksi/seminar/approve',
    seminarReject: () => '/transaksi/seminar/reject',
    seminarPending: () => '/transaksi/seminar/pending',
    privateKonseling: () => '/transaksi/private_konseling',
    PrivateKonselingApprove: () => '/transaksi/private_konseling/approve',
    PrivateKonselingReject: () => '/transaksi/private_konseling/reject',
    PrivateKonselingPending: () => '/transaksi/private_konseling/pending',
    transaksiApprove: (id: any) => `/transaksi/approve/${id}`,
    transaksiReject: (id: any) => `/transaksi/reject/${id}`,
    transaksiPending: (id: any) => `/transaksi/pending/${id}`,
    transaksiPsikolog: (id: any) =>  `/transaksi/psikolog/${id}`,
    transaksiPsikologApprove: (id: any) =>  `/transaksi/psikolog/approve/${id}`,
    transaksiPsikologReject: (id: any) =>  `/transaksi/psikolog/reject/${id}`,
    transaksiPsikologPending: (id: any) =>  `/transaksi/psikolog/pending/${id}`,
    rekomenPsikolog: () => `/transaksi/rekomen_psikolog`
}

const manipulateData = {
    create(data: any){
        return http.post(url.seminar()).send(data)
    },
    createPK(data:any){
      return http.post(url.privateKonseling()).send(data)
    },
    update(data:any,id:any){
        return http.put(url.transaksiId(id)).send(data)
    },
    delete( id:any){
        return http.del(url.transaksiId(id))
    },
    UploadImage(data:any){
      const formData = new FormData()
      formData.append("file", data)
      return http.post(url.image()).send(formData)
  },
  reject(data: any, id: any){
    return http.put(url.reject(id)).send(data)
  },
  approve(id: any){
    return http.put(url.approve(id))
  },
  approvepk(id: any){
    return http.put(url.approvepk(id))
  },
  done(id:any){
    return http.put(url.done(id))
  }
}

const hooks = {
  get(){
    return useSWR(url.transaksiSeminar(), http.fetcher)
  },
  getById(id:any){
    return useSWR(url.transaksiId(id), http.fetcher)
  },
  getImage(){
    return useSWR(url.image(), http.fetcher)
  },
  cusToAd(){
    return useSWR(url.cusToAd(), http.fetcher)
  },
  seminar(){
    return useSWR(url.seminar(), http.fetcher)
  },
  seminarApprove(){
    return useSWR(url.seminarApprove(), http.fetcher)
  },
  seminarReject(){
    return useSWR(url.seminarReject(), http.fetcher)
  },
  seminarPending(){
    return useSWR(url.seminarPending(), http.fetcher)
  },
  privateKonseling(){
    return useSWR(url.privateKonseling(), http.fetcher)
  },
  PrivateKonselingApprove(){
    return useSWR(url.PrivateKonselingApprove(), http.fetcher)
  },
  PrivateKonselingReject(){
    return useSWR(url.PrivateKonselingReject(), http.fetcher)
  },
  PrivateKonselingPending(){
    return useSWR(url.PrivateKonselingPending(), http.fetcher)
  },
  getApprove(id:any){
    return useSWR(url.transaksiApprove(id), http.fetcher)
  },
  getReject(id:any){
    return useSWR(url.transaksiReject(id), http.fetcher)
  },
  getPending(id:any){
    return useSWR(url.transaksiPending(id), http.fetcher)
  },
  transaksiPsikolog(id: any){
    return useSWR(url.transaksiPsikolog(id), http.fetcher)
  },
  transaksiPsikologApprove(id: any){
    return useSWR(url.transaksiPsikologApprove(id), http.fetcher)
  },
  transaksiPsikologReject(id: any){
    return useSWR(url.transaksiPsikologReject(id), http.fetcher)
  },
  transaksiPsikologPending(id: any){
    return useSWR(url.transaksiPsikologPending(id), http.fetcher)
  },
  rekomenPsikolog(){
    return useSWR(url.rekomenPsikolog(), http.fetcher)
  }
}

export const TransaksiRepository = {
    url,
    manipulateData,
    hooks
}
