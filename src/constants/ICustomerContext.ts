import { ICustomer } from "./ICustomer";

export interface ICustomerContext {
    customers: ICustomer[],
    customerDetail: ICustomer,
    getAllCustomers: () => Promise<void> 
    getCustomerDetail: () => Promise<void>
};