import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ICustomer } from "../context/customer/ICustomer";
import { useCustomerContext } from "../hooks/useCustomerContext";

export const CustomerPage = () => {
    
    const { customers, setCustomerDetail, getAllCustomers } = useCustomerContext();

    const handleDelete = () : void => {
        // Swal.fire({
        //     title: "Are you sure you want delete this customer?",
        //     text: "You won't be able to revert this!",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Yes, delete it!"
        // }).then((result) => {

        //     //DELETE CUSTOMER

        //     if (result.isConfirmed) {
        //         Swal.fire({
        //             title: "Deleted!",
        //             text: "Your file has been deleted.",
        //             icon: "success"
        //         });
        //     }
        // });
    };

    const handleAdd = () : void => {
        setCustomerDetail({
            name: "",
            lastname: "",
            address: "",
            phone: ""
        });
    };

    const handleEdit = (customer:ICustomer) => {
        setCustomerDetail({...customer});
        console.log(customer)
    };

    useEffect(() => {
        getAllCustomers();
    }, []);
    
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <h2>Customers</h2>
                    
                    <Link to="/customer/add" className="btn btn-success mb-2" onClick={handleAdd}>
                        <i className="bi bi-person-plus-fill me-1"></i>
                        Add Customer
                    </Link>
                </div>
                
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((entity:ICustomer) => (
                            <tr key={entity.id}>
                                <td>{entity.id}</td>
                                <td>{entity.name}</td>
                                <td>{entity.lastname}</td>
                                <td>{entity.address}</td>
                                <td>{entity.phone}</td>
                                <td>
                                    <Link to={`/customer/${entity.id}`} onClick={() => handleEdit(entity)} className="btn btn-warning me-2">
                                        <i className="bi bi-pencil-square me-1"></i>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete()}>
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
