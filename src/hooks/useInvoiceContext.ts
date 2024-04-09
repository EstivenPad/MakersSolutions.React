import { useContext } from "react"
import { InvoiceContext } from "../context/invoice/InvoiceContext";

export function useInvoiceContext() {
    const context = useContext(InvoiceContext);

    //Check the value returned by context, if context doesn't find a
    //provider will return null, then 'useInvoiceContext' will throw
    //an Error
    
    if(!context){
        throw new Error(
            "useInvoiceContext must be used within InvoiceProvider"
        );
    }

    return context;
}