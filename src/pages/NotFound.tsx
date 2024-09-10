import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
            <Link to="/" className="text-lg text-blue-500 hover:text-blue-700">
                Go back to Home
            </Link>
        </div>
    );
};