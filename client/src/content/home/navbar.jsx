// Navbar.jsx
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ProfileDropdown } from "../../components/profileDropdown.jsx";
import { LogoutOverlay } from "../../components/logoutOverlay.jsx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
    const navigate = useNavigate();

    const links = [
        { id: "home", label: "Home" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
        { id: "competences", label: "Competences" },
        { id: "experiences", label: "Experiences" },
    ];

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const logout = async () => {
        await fetch("http://localhost:4000/logout", {
            method: "POST",
            credentials: "include",
        }).then(() => {
            navigate("/");
        });
        localStorage.removeItem("userId");
        setUserId(null);
        setShowLogoutOverlay(false);
    }

    const handleLogoutClick = () => {
        setShowLogoutOverlay(true);
    }

    const handleCancelLogout = () => {
        setShowLogoutOverlay(false);
    }

    return (
        <>
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-30 backdrop-blur-sm bg-white/95">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-light text-gray-800 tracking-tight">
                                <span className="text-gray-600">Dev</span>Nest
                            </h1>
                        </div>


                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-6">
                                {links.map((item) => (
                                    <a
                                        onClick={(e) => {
                                            if (item.id === "home") {
                                                e.preventDefault();
                                                window.scrollTo({ top: 0 });
                                            }
                                        }}
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-normal transition-all duration-300 hover:bg-gray-50 flex items-center gap-2 group"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-2">
                            <button
                                onClick={() => navigate("/contact")}
                                className="cursor-pointer bg-transparent border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 py-2 rounded-full text-sm font-normal transition-all duration-300 hover:shadow-sm flex items-center gap-2 group"
                            >
                                Contact
                            </button>
                            {userId && (
                                <ProfileDropdown logout={logout} onLogoutClick={handleLogoutClick} />
                            )}
                        </div>


                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="bg-white border border-gray-200 inline-flex items-center justify-center p-2 rounded-full text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none transition-all duration-300"
                            >
                                {isOpen ? (
                                    <FiX className="h-5 w-5" />
                                ) : (
                                    <FiMenu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>


                {isOpen && (
                    <div className="md:hidden fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-40">
                        <div className="px-2 pt-2 pb-4 space-y-1">
                            {links.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 block px-4 py-3 rounded-lg text-base font-normal flex items-center gap-3 transition-all duration-300"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <button
                                className="w-full text-left text-gray-500 hover:text-gray-900 hover:bg-gray-50 block px-4 py-3 rounded-lg text-base font-normal flex items-center gap-3 transition-all duration-300 border border-gray-200 hover:border-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <LogoutOverlay
                open={showLogoutOverlay}
                close={handleCancelLogout}
                confirm={logout}
            />
        </>
    );
}