import { ICustomer } from "./ICustomer";

export interface ICustomerContext {
    customers: ICustomer[],
    customerDetail: ICustomer | null,
    setCustomerDetail: React.Dispatch<React.SetStateAction<ICustomer | null>>,
    getAllCustomers: () => Promise<void> 
    getCustomerDetail: (customerId: number) => Promise<void>,
    addNewCustomer: (customer: ICustomer) => Promise<void>,
    updateCustomer: (customer: ICustomer) => Promise<void>,
    deleteCustomer: (customerId: number) => Promise<void>
};