export type CreateTransaksi = {
    customer : string
    bank: string
    type: 'CusToAdmin' | 'AdminToPsi'
    exp_date: Date
    payment_proof: string
    status: 'pending' | 'reject' | 'approve' | ''
    detailOrder: [{
     id: string,
     types: 'seminar' | 'private_konseling' | '',
     price: number   
    }]
    
}