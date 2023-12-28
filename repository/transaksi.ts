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
    seminar: () => '/transaksi/seminar',
    seminarApprove: () => '/transaksi/seminar/approve',
    seminarReject: () => '/transaksi/seminar/reject',
    seminarPending: () => '/transaksi/seminar/pending',
    privateKonseling: () => '/transaksi/private_konseling'
}

const manipulateData = {
    create(data: any){
        return http.post(url.seminar()).send(data)
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
  }
}

export const TransaksiRepository = {
    url,
    manipulateData,
    hooks
}
