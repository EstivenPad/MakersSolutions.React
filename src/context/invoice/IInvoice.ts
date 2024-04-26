export interface IInvoice {
    id?: number,
    invoiceDate: Date | string,
    createdBy: string,
    concept: string,
    total: number,
    customerId: number
}