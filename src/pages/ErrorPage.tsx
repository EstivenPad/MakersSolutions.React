import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error:any = useRouteError();

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to='/' className="btn btn-warning">
                Back Home
            </Link>
        </div>
    );
}