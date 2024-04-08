import { SubmitHandler, useForm } from "react-hook-form"
import { phonePattern } from "../constants/phoneTemplate";
import { ICustomer } from "../context/customer/ICustomer";
import { useCustomerContext } from "../hooks/useCustomerContext";

export const CustomerView = () => {
    
    const { customerDetail } = useCustomerContext();
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ICustomer>({defaultValues: {...customerDetail}});

    const onSubmit:SubmitHandler<ICustomer> = (data) => {
        
        console.log(data);

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

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success me-2">
                        <i className="bi bi-floppy2-fill me-2"></i>
                        Save
                    </button>

                    <button className="btn btn-secondary me-2" onClick={() => {}}>
                        <i className="bi bi-eraser-fill me-2"></i>
                        Clean
                    </button>
                </div>
            </form>
        </div>
    )
}
