import React from 'react';
import { FiHome, FiArrowLeft, FiFrown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                        <FiFrown className="text-4xl text-gray-400" />
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="text-6xl sm:text-7xl font-light text-gray-800 mb-4">404</h1>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-light text-gray-600 mb-4">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    Sorry, we couldn't find the page you're looking for. 
                    The page might have been moved or doesn't exist.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 px-6 py-3 rounded-full text-sm font-normal hover:border-gray-400 hover:text-gray-700 transition-all duration-300"
                    >
                        <FiArrowLeft className="text-lg" />
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-normal hover:bg-gray-700 transition-all duration-300"
                    >
                        <FiHome className="text-lg" />
                        Back to Home
                    </button>
                </div>

                {/* Additional Help */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-gray-400 text-sm">
                        If you believe this is an error, please{' '}
                        <button 
                            onClick={() => {
                                navigate("/contact")
                            }}
                            className="text-gray-600 cursor-pointer hover:text-gray-800 underline transition-colors duration-300"
                        >
                            contact us
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;