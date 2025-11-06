// components/logoutOverlay.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiX } from 'react-icons/fi';

export const LogoutOverlay = ({ open, close, confirm }) => {
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50"
                        onClick={close}
                    />


                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-xl shadow-lg max-w-sm w-full relative z-10"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <FiLogOut className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800">Sign Out</h3>
                                    <p className="text-sm text-gray-500">Confirm your action</p>
                                </div>
                            </div>
                            <button
                                onClick={close}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <FiX className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>


                        <div className="p-6">
                            <p className="text-gray-600 text-center">
                                Are you sure you want to sign out? You'll need to log in again to access your account.
                            </p>
                        </div>


                        <div className="flex gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={close}
                                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirm}
                                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                            >
                                Yes, Sign Out
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};