import { useState } from "react"
import { ICustomer } from "./ICustomer";
import { makersSolutionsAPI } from "../../api/makersSolutionAPI";
import { createContext } from "react";
import { ICustomerContext } from "./ICustomerContext";
import Swal from "sweetalert2";
import axios from "axios";

interface CustomerContextProviderProps {
    children: React.ReactNode;
}

export const CustomerContext = createContext<ICustomerContext | null>(null);

export const CustomerProvider = ({children}:CustomerContextProviderProps) => {
    
    const [customers, setCustomers] = useState<ICustomer[] | []>([]);
    const [customerDetail, setCustomerDetail] = useState<ICustomer | null>(null);

    const getAllCustomers = async() => {
        try {
            const response = await makersSolutionsAPI.get<ICustomer[]>('/customer');
            const customerList = response.data;

            setCustomers(customerList);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: `Error ${error.response.status}: ${error.response.data}`
                  });
            } else {
                console.error(error);
            } 
        }
    };

    const getCustomerDetail = async(customerId: number) => {
        try {
            const {data} = await makersSolutionsAPI.get<ICustomer>(`/customer/${customerId}`);
    
            setCustomerDetail(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: `Error ${error.response.status}: ${error.response.data}`
                  });
            } else {
                console.error(error);
            } 
        }
    };

    const addNewCustomer = async(customer: ICustomer) => {
        try {
            const {data} = await makersSolutionsAPI.post('/customer', customer);
            
            setCustomers([{id: data.id, ...customer}, ...customers]);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: `Error ${error.response.status}: ${error.response.data}`
                  });
            } else {
                console.error(error);
            } 
        }
    };

    const updateCustomer = async(customerToUpdate: ICustomer) => {
        try {
            await makersSolutionsAPI.put('/customer/', customerToUpdate);
            
            const newCustomerArray = customers.map(customer => {
                if(customer.id !== customerToUpdate.id)
                    return customer;

                return customerToUpdate;
            });

            setCustomers(newCustomerArray);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: `Error ${error.response.status}: ${error.response.data}`
                  });
            } else {
                console.error(error);
            } 
        }
    };

    const deleteCustomer = async(customerId: number) => {
        try {
            await makersSolutionsAPI.delete(`/customer/${customerId}`)
            
            const newCustomerArray = customers.filter(customer => customer.id !== customerId);

            setCustomers(newCustomerArray);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: `Error ${error.response.status}: ${error.response.data}`
                  });
            } else {
                console.error(error);
            }
        }
    };

    const contextValue: ICustomerContext = {
        customers,
        customerDetail,
        setCustomerDetail,
        getAllCustomers,
        getCustomerDetail,
        addNewCustomer,
        updateCustomer,
        deleteCustomer
    }

    return (
        <CustomerContext.Provider value={contextValue}>
            {children}
        </CustomerContext.Provider>
    )
}
