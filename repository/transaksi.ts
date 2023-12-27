import { http } from "#/utils/http"
import useSWR from "swr"


const url = {
    transaksiSeminar: () => '/transaksi/seminar',
    transaksiId: (id:any) => '/transaksi/:id',
    cusToAd: () => '/transaksi/CusToAd',
    adToPsi: () => '/transaksi/AdToPsi',
    image: () => '/transaksi/upload',

}

const manipulateData = {
    create(data: any){
        return http.post(url.transaksiSeminar()).send(data)
    },
    update(data:any,id:any){
        return http.put(url.transaksiId(id)).send(data)
    },
    delete(data: any, id:any){
        return http.del(url.transaksiId(id)).send(data)
    },
    UploadImage(data:any){
      const formData = new FormData()
      formData.append("file", data)
      return http.post(url.image()).send(formData)
  },
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
  }
}

export const TransaksiRepository = {
    url,
    manipulateData,
    hooks
}
