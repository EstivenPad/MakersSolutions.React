import { IInvoice } from "./IInvoice";

export interface IInvoiceContext {
    invoices: IInvoice[],
    invoiceDetail: IInvoice | null,
    setInvoiceDetail: React.Dispatch<React.SetStateAction<IInvoice | null>>,
    getAllInvoices: () => Promise<void> 
    getInvoiceDetail: (invoiceId: number) => Promise<void>,
    addNewInvoice: (invoice: IInvoice) => Promise<void>,
    updateInvoice: (invoice: IInvoice) => Promise<void>,
    deleteInvoice: (invoiceId: number) => Promise<void>,
};