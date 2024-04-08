import { FC, ReactNode, useState } from "react"
import { ICustomer } from "./ICustomer";
import { makersSolutionsAPI } from "../api/makersSolutionAPI";
import { CustomerContext } from "../context/CustomerContext";
import { ICustomerContext } from "./ICustomerContext";

export const CustomerProvider:FC<ReactNode> = ({children}) => {
    
    const [customers, setCustomers] = useState<ICustomer[] | []>([]);
    const [customerDetail, setCustomerDetail] = useState<ICustomer | null>(null);

    const getAllCustomers = async() => {
        const response = await makersSolutionsAPI.get<ICustomer[]>('/customer');
        
        const customerList = response.data;

        setCustomers(customerList);
    };

    const getCustomerDetail = async(id:number) => {
        const response = await makersSolutionsAPI.get<ICustomer>(`/customer/${id}`);
        const customerDetail = response.data;
        setCustomerDetail(customerDetail);
    };

    const contextValue: ICustomerContext = {
        customers,
        customerDetail,
        getAllCustomers,
        getCustomerDetail
    }

    return (
        <CustomerContext.Provider value={contextValue}>
            {children}
        </CustomerContext.Provider>
    )
}
