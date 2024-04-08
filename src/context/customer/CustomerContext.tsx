import { useState } from "react"
import { ICustomer } from "./ICustomer";
import { makersSolutionsAPI } from "../../api/makersSolutionAPI";
import { createContext } from "react";
import { ICustomerContext } from "./ICustomerContext";

interface CustomerContextProviderProps {
    children: React.ReactNode;
}

export const CustomerContext = createContext<ICustomerContext | null>(null);

export const CustomerProvider = ({children}:CustomerContextProviderProps) => {
    
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
        setCustomerDetail,
        getAllCustomers,
        getCustomerDetail,
    }

    return (
        <CustomerContext.Provider value={contextValue}>
            {children}
        </CustomerContext.Provider>
    )
}
