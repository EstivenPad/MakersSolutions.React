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
                path: "/invoice",
                element: <InvoicePage />
            },
            
            {
                path: "/customer/*",
                element: <CustomerView />  
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CustomerProvider>
            <RouterProvider router={router}/>
        </CustomerProvider>
    </React.StrictMode>,
)
