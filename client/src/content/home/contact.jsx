import React from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";
import { useToast } from "../../components/toast";
import { socialLinks } from "../../constants/socialMedia";

const Contact = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    try {
      const res = await fetch("http://localhost:4000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Message sent successfully!");
        reset();
      } else {
        toast.error(result.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending contact message:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8" id="contact">
      <div className="max-w-6xl mx-auto">
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
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium mb-1">Email</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    {socialLinks.gmail}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Typically replies within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium mb-1">Phone</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    {socialLinks.numberPhone}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Mon-Fri from 9am to 6pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium mb-1">Location</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    {socialLinks.address}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Available for remote work worldwide
                  </p>
                </div>
              </div>

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

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <div>
                    <input
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <div>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

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
                  {...register("subject", {
                    required: "Subject is required",
                    minLength: {
                      value: 3,
                      message: "Subject must be at least 3 characters",
                    },
                  })}
                  className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 ${
                    errors.subject ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Message
                </label>
                <div>
                  <textarea
                    id="message"
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    rows="6"
                    className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 resize-none ${
                      errors.message ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Tell me about your project, timeline, and budget..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
              >
                Send Message
              </button>

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
