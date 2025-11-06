import React from "react";
import {motion} from "framer-motion";
import {FiLoader} from "react-icons/fi";


export const LoadingSpinner = ({content, color}) => {
    return (
        <div
            className="flex items-center gap-2"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <FiLoader className={`h-4 w-4 ${color}`} />
            </motion.div>
            <span className={`${color}`} >{content}</span>
        </div>
    )
}