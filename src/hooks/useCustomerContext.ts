import { useContext } from "react"
import { CustomerContext } from "../context/customer/CustomerContext";

export function useCustomerContext() {
    const context = useContext(CustomerContext);

    //Check the value returned by context, if context doesn't find a
    //provider will return null, then 'useCustomerContext' will throw
    //an Error
    
    if(!context){
        throw new Error(
            "useCustomerContext must be used within CustomerProvider"
        );
    }

    return context;
}