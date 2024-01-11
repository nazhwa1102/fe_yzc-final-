import { http } from "#/utils/http"
import useSWR from "swr"


const url = {
    bank: () => '/bank',
    bankId: (id: any) => `/bank/${id}`,
    bankPsi: (id: any) => `/bank/psikolog/${id}`,
    createBankPsi: () => '/bank/psikolog/bank',
    qr: () =>  `/bank/upload`, 
}

const manipulateData = {
  createBankPsi(data: any){
    return http.post(url.createBankPsi()).send(data)
  },
  delete(id: any){
    return http.del(url.bankPsi(id))
  },
  update(id: any, data:any){
    return http.put(url.bankPsi(id)).send(data)
  },
  UploadImage(data:any){
    const formData = new FormData()
    formData.append("file", data)
    return http.post(url.qr()).send(formData)
},
}

const hooks = {
    bank(){
     return useSWR(url.bank(), http.fetcher)
    },
    bankPsi(id:any){
     return useSWR(url.bankPsi(id), http.fetcher)
    },
}
export const BankRepository = {
    url,
    manipulateData,
    hooks
}

