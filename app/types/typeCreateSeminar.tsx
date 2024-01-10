export type CreateSeminar = {
    psikolog : string[],
    title: string,
    price: number,
    poster: string,
    link: string,
    datetime: Date,
    kuota: number,
    status: 'pending' | 'reject' | 'approve' | '',
}