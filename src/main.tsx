import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppRoot from './router/AppRooter'
import ErrorPage from './pages/ErrorPage'
import { CustomerPage } from './pages/CustomerPage'
import { InvoicePage } from './pages/InvoicePage'
import { CustomerView } from './views/CustomerForm'
import { CustomerProvider } from './context/customer/CustomerContext'
import { InvoiceProvider } from './context/invoice/InvoiceContext'
import { InvoiceView } from './views/InvoiceForm'

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppRoot />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/customer",
                element: <CustomerPage />
            },
            {
                path: "/customer/*",
                element: <CustomerView />  
            },
            {
                path: "/invoice",
                element: <InvoicePage />
            },
            {
                path: "/invoice/*",
                element: <InvoiceView />  
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CustomerProvider>
            <InvoiceProvider>
                <RouterProvider router={router}/>
            </InvoiceProvider>
        </CustomerProvider>
    </React.StrictMode>,
)
