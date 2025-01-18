import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <header className="py-5" style={{ backgroundColor: "#6050DC", margin: "5.4rem 0" }}>
            <div className="container px-5 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">404</h1>
                    <p className="lead fw-normal text-white-75 mb-4">Page Not Found!</p>
                    <Link className="btn btn-light btn-lg rounded-pill px-4 py-2" to="/">← Go Back</Link>
                </div>
            </div>
        </header>
    )
}

export default NotFoundPage
