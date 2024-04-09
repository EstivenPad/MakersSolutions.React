export interface IInvoice {
    id?: number,
    invoiceDate: string,
    createdBy: string,
    concept: string,
    total: number,
    customerId: number
}