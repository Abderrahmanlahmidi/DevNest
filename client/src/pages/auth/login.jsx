import React, { useEffect } from 'react';
import { FiMail, FiLock, FiEyeOff, FiLogIn} from 'react-icons/fi';
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();
   const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("ATh7QDtfdodYQxXezXeRmKEoqDP9Qot1TFt")) {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center">
            <FiLogIn className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-light text-gray-800">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Or{' '}
            <a href="#" className="font-normal text-gray-600 hover:text-gray-800">
              create a new account
            </a>
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 text-sm"
                placeholder="Email address"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>

          {/* Remember me and Forgot password
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-gray-800 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-800">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-normal text-gray-600 hover:text-gray-800">
                Forgot your password?
              </a>
            </div>
          </div> */}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-normal rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Sign in
            </button>
          </div>

          
        </form>
      </div>
    </div>
  );
}