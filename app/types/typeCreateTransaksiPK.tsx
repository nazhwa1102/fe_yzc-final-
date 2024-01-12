export type CreateTransaksiPK = {
    customer : string
    psikolog: string
    bank: string
    type: 'CusToAdmin'
    exp_date: Date
    payment_proof: string
    status: 'pending' | 'reject' | 'approve' | ''
    datetime: Date[]
    price: number
}