import { useState } from "react"
import { IInvoice } from "./IInvoice";
import { makersSolutionsAPI } from "../../api/makersSolutionAPI";
import { createContext } from "react";
import { IInvoiceContext } from "./IInvoiceContext";
import Swal from "sweetalert2";
import axios from "axios";

interface InvoiceContextProviderProps {
    children: React.ReactNode;
}

export const InvoiceContext = createContext<IInvoiceContext | null>(null);

export const InvoiceProvider = ({children}:InvoiceContextProviderProps) => {
    
    const [invoices, setInvoices] = useState<IInvoice[] | []>([]);
    const [invoiceDetail, setInvoiceDetail] = useState<IInvoice | null>(null);

    const getAllInvoices = async() => {
        try {
            const {data} = await makersSolutionsAPI.get<IInvoice[]>('/invoice');
            
            setInvoices(data);
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

    const getInvoiceDetail = async(invoiceId: number) => {
        try {
            const {data} = await makersSolutionsAPI.get<IInvoice>(`/invoice/${invoiceId}`);
    
            setInvoiceDetail(data);
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

    const addNewInvoice = async(invoice: IInvoice) => {
        try {
            const invoiceDate = new Date(invoice.invoiceDate);
            const {data} = await makersSolutionsAPI.post('/invoice', {...invoice, invoiceDate});
            
            setInvoices([{id: data.id, ...invoice}, ...invoices]);
            
            Swal.fire({
                title: "Success!",
                text: `Your invoice has been ${data.id ? "updated" : "added"} successfully.`,
                icon: "success"
            });
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

    const updateInvoice = async(invoiceToUpdate: IInvoice) => {
        try {
            await makersSolutionsAPI.put('/invoice/', invoiceToUpdate);
            
            const newInvoiceArray = invoices.map(invoice => {
                if(invoice.id !== invoiceToUpdate.id)
                    return invoice;

                return invoiceToUpdate;
            });

            setInvoices(newInvoiceArray);
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

    const deleteInvoice = async(invoiceId: number) => {
        try {
            await makersSolutionsAPI.delete(`/invoice/${invoiceId}`)
            
            const newInvoiceArray = invoices.filter(invoice => invoice.id !== invoiceId);

            setInvoices(newInvoiceArray);
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

    const contextValue: IInvoiceContext = {
        invoices,
        invoiceDetail,
        setInvoiceDetail,
        getAllInvoices,
        getInvoiceDetail,
        addNewInvoice,
        updateInvoice,
        deleteInvoice
    }

    return (
        <InvoiceContext.Provider value={contextValue}>
            {children}
        </InvoiceContext.Provider>
    )
}
