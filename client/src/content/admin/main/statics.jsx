import React from 'react';
import { FiTool, FiBriefcase, FiAward, FiUser } from 'react-icons/fi';

const Statics = () => {
    const stats = [
        { icon: FiTool, label: "Total Skills", value: "12", color: "blue" },
        { icon: FiBriefcase, label: "Projects", value: "8", color: "green" },
        { icon: FiAward, label: "Competences", value: "6", color: "purple" },
        { icon: FiUser, label: "Experiences", value: "5", color: "orange" }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600'
        };
        return colors[color] || 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-light text-gray-800 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-2">{stat.label}</p>
                                <p className="text-3xl font-light text-gray-800">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Statics;