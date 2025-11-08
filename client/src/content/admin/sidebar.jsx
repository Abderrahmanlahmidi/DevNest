import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiTool, FiBriefcase, FiAward, FiUser, FiLogOut, FiArrowLeft } from 'react-icons/fi';

export const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: "/dashboard", icon: FiHome, label: "Dashboard" },
        { path: "/dashboard/skills", icon: FiTool, label: "Skills" },
        { path: "/dashboard/projects", icon: FiBriefcase, label: "Projects" },
        { path: "/dashboard/competences", icon: FiAward, label: "Competences" },
        { path: "/dashboard/experiences", icon: FiUser, label: "Experiences" },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col transition-all duration-300">

            <div className="p-6 border-b border-gray-100 transition-colors duration-300">
                <h1 className="text-2xl font-light text-gray-800 transition-colors duration-300">
                    <span className="font-normal text-gray-600 transition-colors duration-300">Dev</span>Nest
                </h1>
            </div>

            <nav className="p-4 space-y-1 flex-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] ${
                                isActive
                                    ? 'bg-gray-800 text-white border border-gray-800 shadow-md scale-[1.02]'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm hover:border hover:border-gray-200'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                                isActive ? 'text-white' : 'text-gray-400 hover:text-gray-600'
                            }`} />
                            <span className="font-medium transition-colors duration-300">{item.label}</span>
                            
                            {/* Active indicator */}
                            {isActive && (
                                <div className="ml-auto w-2 h-2 bg-white rounded-full transition-all duration-300" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 space-y-2 transition-colors duration-300">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] group"
                >
                    <FiArrowLeft className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-gray-600 group-hover:-translate-x-1" />
                    <span className="font-medium transition-colors duration-300">Back to Home</span>
                </Link>

                <Link
                    to="/logout"
                    className="flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] group"
                >
                    <FiLogOut className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
                    <span className="font-medium transition-colors duration-300">Logout</span>
                </Link>
            </div>
        </div>
    );
};