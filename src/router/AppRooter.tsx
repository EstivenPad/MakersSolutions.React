import { Link, Outlet } from "react-router-dom";

export default function AppRoot() {
    return (
        <>
            <div className="d-flex flex-column gap-4 ">
                <h1 className="align-self-center">Makers Solutions</h1>
                
                <ul className="d-flex justify-content-center gap-4" style={{listStyle: 'none'}}>
                    <li>
                        <Link to='/customer' className="btn btn-primary p-2 w-20">
                            <p className="h4">
                                <i className="bi bi-people-fill me-1"></i>
                                Customers
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/invoice' className="btn btn-primary p-2 w-20">
                            <p className="h4">
                                <i className="bi bi-receipt-cutoff me-1"></i>
                                Invoices
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>

            <Outlet/>
        </>
    );
  }