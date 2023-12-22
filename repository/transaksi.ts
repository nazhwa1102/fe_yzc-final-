import { http } from "#/utils/http"
import useSWR from "swr"


const url = {
    transaksi: () => '/transaksi',
    transaksiId: (id:any) => '/transaksi/:id',
    cusToAd: () => '/transaksi/CusToAd',
    adToPsi: () => '/transaksi/AdToPsi'
}

const manipulateData = {
    create(data: any){
        return http.post(url.transaksi()).send(data)
    },
    update(data:any,id:any){
        return http.put(url.transaksiId(id)).send(data)
    },
    delete(data: any, id:any){
        return http.del(url.transaksiId(id)).send(data)
    },
    
}

const hooks = {
  get(){
    return useSWR(url.transaksi(), http.fetcher)
  },
  getById(id:any){
    return useSWR(url.transaksiId(id), http.fetcher)
  }
}

export const PsikologRepository = {
    url,
    manipulateData,
    hooks
}
