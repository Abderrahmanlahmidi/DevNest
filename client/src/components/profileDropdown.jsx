// components/profileDropdown.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiGrid, FiLogOut } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

export const ProfileDropdown = ({ onLogoutClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        { icon: FiUser, label: 'Profile', link: '/profile' },
        { icon: FiGrid, label: 'Dashboard', link: '/dashboard' },
        { icon: FiLogOut, label: 'Logout', isDestructive: true },
    ];

    const handleItemClick = (item) => {
        setIsOpen(false);

        if (item.isDestructive) {
            onLogoutClick();
        } else if (item.link) {
            navigate(item.link);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-12 w-56 bg-white rounded-lg border border-gray-200 shadow-lg py-2 z-40"
                    >
                        {menuItems.map((item) => (
                            <motion.button
                                key={item.label}
                                className={`flex cursor-pointer items-center gap-3 w-full px-4 py-2 text-sm transition-colors duration-200 ${
                                    item.isDestructive
                                        ? 'text-red-600 hover:bg-red-50'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                                whileHover={{ backgroundColor: item.isDestructive ? '#fef2f2' : '#f9fafb' }}
                                onClick={() => handleItemClick(item)}
                            >
                                <item.icon className={`h-4 w-4 ${
                                    item.isDestructive ? 'text-red-500' : 'text-gray-400'
                                }`} />
                                {item.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};