import { SubmitHandler, useForm } from "react-hook-form"
import { IInvoice } from "../context/invoice/IInvoice";
import { useInvoiceContext } from "../hooks/useInvoiceContext";
import { useEffect, useState } from "react";
import { useCustomerContext } from "../hooks/useCustomerContext";
import { useNavigate } from "react-router-dom";

export const InvoiceView = () => {
    
    const { invoiceDetail, addNewInvoice, updateInvoice } = useInvoiceContext();
    const { customerDetail, getCustomerDetail } = useCustomerContext();

    const [searchId, setSearchId] = useState(0);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IInvoice>({
        defaultValues: { invoiceDate: invoiceDetail?.invoiceDate.toString(), ...invoiceDetail }
    });

    const onSubmit:SubmitHandler<IInvoice> = (data) => {
        if(!data.id)
            addNewInvoice({ ...data, customerId: searchId });
        else
            updateInvoice({ ...data, customerId: searchId });
        
        navigate(-1);
    };
    
    const searchCustomer = () => {
        getCustomerDetail(searchId);
    };

    useEffect(() => {
        setSearchId(invoiceDetail?.customerId);
    }, []);
      
    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="">Customer</label>
                    <div className="mb-3 row">
                        <div className="col-auto">
                            <label className="form-control-plaintext">{(customerDetail?.id === undefined) ? 'Customer Name' : customerDetail?.name}</label>
                        </div>
                        <div className="col-auto">
                            <input type="number" value={searchId} className="form-control" placeholder="Customer ID" onChange={(e) => setSearchId(e.target.value)}/>
                        </div>
                        <div className="col-auto">
                            <button type="button" onClick={searchCustomer} className="btn btn-primary mb-3">Search</button>
                        </div>
                    </div>

                    {errors.customerId && <div className="alert alert-danger mt-2">{errors.customerId.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" {...register('invoiceDate', {required: 'Date is required'})} />
                    {errors.invoiceDate && <div className="alert alert-danger mt-2">{errors.invoiceDate.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Concept</label>
                    <input type="text" className="form-control" {...register('concept', {required: 'Concept is required'})}/>
                    {errors.concept && <div className="alert alert-danger mt-2">{errors.concept.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Created by</label>
                    <input type="text" className="form-control" {...register('createdBy', {required: 'Created by is required'})} />
                    {errors.createdBy && <div className="alert alert-danger mt-2">{errors.createdBy.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Total</label>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">$</span>
                        <input 
                            type="number"
                            min="0" 
                            step="any" 
                            className="form-control"
                            placeholder="0.00"
                            {...register('total', {
                                required: 'Total is required',
                                min: {
                                    value: 1,
                                    message: 'The minimum value accept for this field is (1)'
                                },
                                valueAsNumber: true
                            })}
                        />
                    </div>
                    {errors.total && <div className="alert alert-danger mt-2">{errors.total.message}</div>}
                </div>

                <div className="d-flex justify-content-center mb-5">
                    <button type="submit" className="btn btn-success me-2 w-25">
                        <i className="bi bi-floppy2-fill me-2"></i>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
