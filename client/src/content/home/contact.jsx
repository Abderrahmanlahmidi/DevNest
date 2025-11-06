import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8" id="contact">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
            Get In <span className="text-gray-600 font-normal">Touch</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Ready to start your next project? Let's discuss how we can work
            together to bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Contact Item 1 */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium mb-1">Email</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    hello@devnest.com
                  </p>
                  <p className="text-gray-400 text-xs">
                    Typically replies within 24 hours
                  </p>
                </div>
              </div>

              {/* Contact Item 2 */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium mb-1">Phone</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-gray-400 text-xs">
                    Mon-Fri from 9am to 6pm
                  </p>
                </div>
              </div>

              {/* Contact Item 3 */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium mb-1">Location</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    San Francisco, CA
                  </p>
                  <p className="text-gray-400 text-xs">
                    Available for remote work worldwide
                  </p>
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(34, 197, 94, 0.7)",
                        "0 0 0 6px rgba(34, 197, 94, 0)",
                        "0 0 0 0 rgba(34, 197, 94, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-green-800 text-sm font-medium">
                    Available for new projects
                  </span>
                </div>
                <p className="text-green-700 text-xs">
                  Currently accepting freelance work and open to full-time
                  opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FiMessageSquare className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project, timeline, and budget..."
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <FiSend className="group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>

              {/* Privacy Note */}
              <p className="text-gray-400 text-xs text-center">
                Your information is safe with us. We never share your details
                with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
