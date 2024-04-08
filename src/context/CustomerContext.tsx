import { createContext } from "react";
import { ICustomerContext } from "../constants/ICustomerContext";

export const CustomerContext = createContext<ICustomerContext | null>(null);
