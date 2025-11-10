import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight, FiMail } from "react-icons/fi";
import { downloadDocument } from "../../constants/downloadDocument";
import { socialLinks } from "../../constants/socialMedia";

const Hero = () => {

  const profileImage = "../../../src/assets/images/youcode_profile.jpeg";
  const url = "../../../src/assets/documents/Abderrahmane-Lahmidi.pdf";

  return (
    <section
      id="home"
      className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto text-center">

        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200">
              <img
                className="rounded-full"
                src={profileImage}
                alt="Profile-Image"
              />
            </div>
            <div className="absolute right-1 bottom-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>


        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-800 mb-4 tracking-tight">
          Hello, I'm{" "}
          <span className="text-gray-600 font-normal">
            Lahmidi Abderrahmane
          </span>
        </h1>


        <p className="text-xl sm:text-2xl text-gray-500 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
          Full-Stack Developer & UI/UX Enthusiast
          <span className="block text-lg text-gray-400 mt-2">
            Crafting elegant digital experiences with modern technologies
          </span>
        </p>


        <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed text-lg">
          I specialize in creating responsive, user-friendly web applications
          using React, Node.js, and modern development practices. Currently
          focused on building scalable solutions at DevNest.
        </p>


        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="#projects" className="bg-gray-800 cursor-pointer text-white px-8 py-3 rounded-full text-sm font-normal hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 group">
            View My Work
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => {
              downloadDocument(url);
            }}
            className="border cursor-pointer border-gray-300 text-gray-600 px-8 py-3 rounded-full text-sm font-normal hover:border-gray-400 hover:text-gray-700 transition-all duration-300"
          >
            Download CV
          </button>
        </div>


        <div className="flex justify-center items-center gap-6">
          <a
            href={socialLinks.githubLink}
            className="text-gray-400 hover:text-gray-600 transition-all duration-300 p-3 hover:bg-gray-50 rounded-full"
          >
            <FiGithub className="text-xl" />
          </a>
          <a
            href={socialLinks.linkedinLink}
            className="text-gray-400 hover:text-gray-600 transition-all duration-300 p-3 hover:bg-gray-50 rounded-full"
          >
            <FiLinkedin className="text-xl" />
          </a>
          <a
            href={socialLinks.twitterLink}
            className="text-gray-400 hover:text-gray-600 transition-all duration-300 p-3 hover:bg-gray-50 rounded-full"
          >
            <FiTwitter className="text-xl" />
          </a>
          <a
            href={socialLinks.gmailLink}
            className="text-gray-400 hover:text-gray-600 transition-all duration-300 p-3 hover:bg-gray-50 rounded-full"
          >
            <FiMail className="text-xl" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
