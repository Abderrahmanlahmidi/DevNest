import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

export const LoadingPage = ({name}) => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center space-y-6">

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="relative"
                >
                    <FiLoader className="h-10 w-10 text-gray-600 mx-auto" />


                    <motion.div
                        className="absolute -inset-2 "
                        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                        transition={{
                            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity }
                        }}
                    />
                </motion.div>


                <motion.div

                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-xl font-light text-gray-700 mb-2">
                        DevNest
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Loading your {name}
                    </p>
                </motion.div>


                <motion.div className="flex justify-center gap-1">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: index * 0.2
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};