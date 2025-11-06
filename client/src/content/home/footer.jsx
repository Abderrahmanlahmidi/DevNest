import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiChevronUp  } from 'react-icons/fi';
import { socialLinks } from '../../constants/socialMedia';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-light text-gray-800 mb-4">
                            <span className="text-gray-600">Dev</span>Nest
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-md mb-6">
                            Full-stack developer passionate about creating elegant digital experiences 
                            and solving complex problems with modern technologies.
                        </p>
                        <div className="flex items-center gap-4">
                            <a 
                                href={socialLinks.gmailLink}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2 hover:bg-white rounded-lg"
                            >
                                <FiMail className="text-lg" />
                            </a>
                            <a 
                                href={socialLinks.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2 hover:bg-white rounded-lg"
                            >
                                <FiGithub className="text-lg" />
                            </a>
                            <a 
                                href={socialLinks.linkedinLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2 hover:bg-white rounded-lg"
                            >
                                <FiLinkedin className="text-lg" />
                            </a>
                            <a 
                                href={socialLinks.twitterLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2 hover:bg-white rounded-lg"
                            >
                                <FiTwitter className="text-lg" />
                            </a>
                        </div>
                    </div>


                    <div>
                        <h4 className="text-gray-800 font-medium mb-4 text-sm uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-3">
                            <li>
                                <a 
                                    href="#home" 
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#skills" 
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm"
                                >
                                    Skills
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#projects" 
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm"
                                >
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#experiences" 
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm"
                                >
                                    Experience
                                </a>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h4 className="text-gray-800 font-medium mb-4 text-sm uppercase tracking-wider">Get In Touch</h4>
                        <ul className="space-y-3">
                            <li>
                                <a 
                                    href="mailto:hello@devnest.com"
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm"
                                >
                                    {socialLinks.gmail}
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="tel:+1234567890"
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm"
                                >
                                   {socialLinks.numberPhone}
                                </a>
                            </li>
                            <li>
                                <span className="text-gray-500 text-sm">
                                   {socialLinks.address}
                                </span>
                            </li>
                            <li>
                                <span className="text-gray-500 text-sm">
                                    Available for freelance
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>


                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-400 text-sm flex items-center gap-1">
                        <span>© {currentYear} DevNest. Made with</span>
                        <FiHeart className="text-red-400" />
                        <span>and lots of coffee</span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-gray-400 text-sm">
                        <a 
                            href="/privacy" 
                            className="hover:text-gray-600 transition-colors duration-300"
                        >
                            Privacy
                        </a>
                        <a 
                            href="/terms" 
                            className="hover:text-gray-600 transition-colors duration-300"
                        >
                            Terms
                        </a>
                        <span>v1.0.0</span>
                    </div>
                </div>


                <button 
                    onClick={() => window.scrollTo({ top: 0 })}
                    className="fixed bottom-8 right-8 bg-white border border-gray-300 text-gray-500 p-3 rounded-full shadow-sm hover:shadow-md hover:text-gray-700 hover:border-gray-400 transition-all duration-300"
                >
                    <FiChevronUp className="w-4 h-4" />
                </button>
            </div>
        </footer>
    );
};

export default Footer;