import { SubmitHandler, useForm } from "react-hook-form"
import { phonePattern } from "../constants/phoneTemplate";
import { ICustomer } from "../context/customer/ICustomer";
import { useCustomerContext } from "../hooks/useCustomerContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const CustomerView = () => {
    
    const { customerDetail, addNewCustomer, updateCustomer } = useCustomerContext();
    
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ICustomer>({
        defaultValues: { ...customerDetail }
    });

    const onSubmit:SubmitHandler<ICustomer> = (data) => {
        if(!data.id)
            addNewCustomer(data);
        else
            updateCustomer(data);
        
        Swal.fire({
            title: "Success!",
            text: `Your customer has been ${data.id ? "updated" : "added"} successfully.`,
            icon: "success"
        });

        navigate(-1);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" {...register('name', {required: 'Name is required'})} />
                    {errors.name && <div className="alert alert-danger mt-2">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Lastname</label>
                    <input type="text" className="form-control" {...register('lastname', {required: 'Lastname is required'})}/>
                    {errors.lastname && <div className="alert alert-danger mt-2">{errors.lastname.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" {...register('address', {required: 'Address is required'})}/>
                    {errors.address && <div className="alert alert-danger mt-2">{errors.address.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">+1</span>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="000-000-0000"
                            {...register('phone', {
                                required: 'Phone is required',
                                pattern:  {
                                    value: phonePattern,
                                    message: 'Phone number must have the follow pattern: 000-000-0000'
                                }
                            })}
                        />
                        
                    </div>
                    {errors.phone && <div className="alert alert-danger mt-2">{errors.phone.message}</div>}
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
