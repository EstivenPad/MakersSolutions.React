import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CustomerContext } from "../context/CustomerContext";

type Customer = {
    id: number,
    name: string,
    lastname: string,
    address: string,
    phone: string
}

export const CustomerPage = () => {
    
    // const [customers, setCustomers] = useState<Customer[] | []>([]);

    const { customers, customerDetail, getAllCustomers, getCustomerDetail } = useContext(CustomerContext);

    const handleDelete = (customer:Customer) : void => {
        Swal.fire({
            title: "Are you sure you want delete this customer?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            //DELETE CUSTOMER

            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    
    // const getCustomers = async() => {
    //     const response = await makersSolutionsAPI.get<Customer[]>('/customer');
    //     const customerList = response.data;
    //     setCustomers(customerList);
    // };
    useEffect(() => {
        getAllCustomers();
        getCustomerDetail(2);
    }, [customers]);
    
    // console.log(customerDetail)

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <h2>Customers</h2>
                    
                    <Link to="/customer/add" className="btn btn-success mb-2">
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
                        {customers.map(entity => (
                            <tr key={entity.id}>
                                <td>{entity.id}</td>
                                <td>{entity.name}</td>
                                <td>{entity.lastname}</td>
                                <td>{entity.address}</td>
                                <td>{entity.phone}</td>
                                <td>
                                    <Link to={`/customer/${entity.id}`} className="btn btn-warning me-2">
                                        <i className="bi bi-pencil-square me-1"></i>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(entity)}>
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
