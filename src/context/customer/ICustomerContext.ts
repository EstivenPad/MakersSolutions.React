import { ICustomer } from "./ICustomer";

export interface ICustomerContext {
    customers: ICustomer[],
    customerDetail: ICustomer | null,
    setCustomerDetail: React.Dispatch<React.SetStateAction<ICustomer | null>>,
    getAllCustomers: () => Promise<void> 
    getCustomerDetail: (id:number) => Promise<void>
};