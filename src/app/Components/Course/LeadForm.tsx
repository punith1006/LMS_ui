"use client";

import React from "react";
import { motion } from "framer-motion";

const LeadForm = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in touch</h2>
          <p className="text-gray-500 text-sm">We'd love to hear from you. Please fill out this form.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700 ml-0.5">First name</label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700 ml-0.5">Last name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700 ml-0.5">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700 ml-0.5">Phone number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                  US
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </span>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 rounded-r-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700 ml-0.5">Message</label>
              <textarea
                rows={4}
                placeholder="Leave us a message..."
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 shadow-sm resize-none transition-all"
              />
            </div>

            <div className="flex items-start gap-2 mt-2 mb-6">
              <input type="checkbox" id="privacy" className="mt-0.5 w-3.5 h-3.5 text-orange-500 rounded border-gray-300 focus:ring-orange-500" />
              <label htmlFor="privacy" className="text-xs text-gray-500">You agree to our friendly privacy policy.</label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#EB900C] hover:bg-[#D4820B] text-white font-semibold py-2.5 rounded-lg shadow transition-all duration-300 hover:shadow-md active:scale-[0.98]"
            >
              Send message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadForm;
