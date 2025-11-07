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
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-light text-gray-800">
                    <span className="text-gray-600">Dev</span>Nest
                </h1>
            </div>

            <nav className="p-4 space-y-2 flex-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                            location.pathname === item.path
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200 space-y-2">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Home</span>
                </Link>

                <Link
                    to="/logout"
                    className="flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                    <FiLogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </Link>
            </div>
        </div>
    );
};