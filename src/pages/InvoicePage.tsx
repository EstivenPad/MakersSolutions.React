import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IInvoice } from "../context/invoice/IInvoice";
import { useInvoiceContext } from "../hooks/useInvoiceContext";
import Swal from "sweetalert2";
import { useCustomerContext } from "../hooks/useCustomerContext";

export const InvoicePage = () => {
    
    const { invoices, setInvoiceDetail, getAllInvoices, deleteInvoice } = useInvoiceContext();
    const { setCustomerDetail, getCustomerDetail } = useCustomerContext();

    const handleAdd = () : void => {
        setInvoiceDetail({
            invoiceDate: new Date().toISOString().substring(0, 10),
            createdBy: "",
            concept: "",
            total: 0,
            customerId: 0
        });
    };

    const handleEdit = (invoice: IInvoice) => {
        getCustomerDetail(invoice.customerId);
        setInvoiceDetail({ ...invoice, invoiceDate: new Date(invoice.invoiceDate).toISOString().substring(0, 10) });
    };

    const handleDelete = (invoiceId: number = 0) : void => {
        Swal.fire({
            title: "Are you sure you want delete this invoice?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                deleteInvoice(invoiceId);
                
                Swal.fire({
                    title: "Success!",
                    text: "Your invoice has been deleted successfully.",
                    icon: "success"
                });
            }
        });
    };

    useEffect(() => {
        setCustomerDetail(null);
        getAllInvoices();
    }, []);
    
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <h2>Invoices</h2>
                    
                    <Link to="/invoice/form" className="btn btn-success mb-2" onClick={handleAdd}>
                        <i className="bi bi-person-plus-fill me-1"></i>
                        Add Invoice
                    </Link>
                </div>
                
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Created by</th>
                            <th>Concept</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((entity:IInvoice, index) => (
                            <tr key={index}>
                                <td>{entity.id}</td>
                                <td>{entity.invoiceDate.toString().substring(0, 10)}</td>
                                <td>{entity.createdBy}</td>
                                <td>{entity.concept}</td>
                                <td>{entity.total}</td>
                                <td>
                                    <Link to={`/invoice/${entity.id}`} onClick={() => handleEdit(entity)} className="btn btn-warning me-2">
                                        <i className="bi bi-pencil-square me-1"></i>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(entity.id)}>
                                        <i className="bi bi-trash2-fill me-1"></i>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
