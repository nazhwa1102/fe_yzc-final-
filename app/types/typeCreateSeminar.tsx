export type CreateSeminar = {
    psikolog : string[],
    title: string,
    price: number,
    poster: string,
    link: string,
    datetime: Date,
    status: 'pending' | 'reject' | 'approve' | '',
}