"use client";

import { Lawyer } from "@/types";
import { useState } from "react";

interface LawyerProfileModalProps {
  lawyer: Lawyer;
  isOpen: boolean;
  onClose: () => void;
}

export default function LawyerProfileModal({
  lawyer,
  isOpen,
  onClose,
}: LawyerProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a2e4f] to-[#1e3a5f] px-8 py-6 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center text-2xl font-bold text-[#1a2e4f]">
                  {lawyer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {lawyer.name}
                  </h2>
                  <p className="text-gray-200 text-lg">
                    {lawyer.specialization}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-[#d4af37] transition-colors p-2"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Rating and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lawyer.rating && (
                <div className="bg-[#f4e4bc] rounded-lg p-4 border-2 border-[#d4af37]">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-6 h-6 text-[#d4af37]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-2xl font-bold text-[#1a2e4f]">
                      {lawyer.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Client Rating</p>
                </div>
              )}
              {lawyer.experience && (
                <div className="bg-[#f4e4bc] rounded-lg p-4 border-2 border-[#d4af37]">
                  <div className="text-2xl font-bold text-[#1a2e4f] mb-2">
                    {lawyer.experience}
                  </div>
                  <p className="text-sm text-gray-600">Experience</p>
                </div>
              )}
              {lawyer.successRate && (
                <div className="bg-[#f4e4bc] rounded-lg p-4 border-2 border-[#d4af37]">
                  <div className="text-2xl font-bold text-[#1a2e4f] mb-2">
                    {lawyer.successRate}
                  </div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              )}
            </div>

            {/* Bio */}
            {lawyer.bio && (
              <div>
                <h3 className="text-xl font-bold text-[#1a2e4f] mb-3 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-[#d4af37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">{lawyer.bio}</p>
              </div>
            )}

            {/* Education */}
            {lawyer.education && lawyer.education.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#1a2e4f] mb-3 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-[#d4af37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14v9.055"
                    />
                  </svg>
                  Education
                </h3>
                <ul className="space-y-2">
                  {lawyer.education.map((edu, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-[#1a2e4f]"
                    >
                      <svg
                        className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practice Areas */}
            {lawyer.practiceAreas && lawyer.practiceAreas.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#1a2e4f] mb-3 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-[#d4af37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Practice Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lawyer.practiceAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#1a2e4f] text-white rounded-full text-sm font-semibold"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-[#1a2e4f] mb-3 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-[#d4af37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-[#1a2e4f]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a
                      href={`tel:${lawyer.contact}`}
                      className="text-[#1a2e4f] hover:text-[#1e3a5f] font-semibold"
                    >
                      {lawyer.contact}
                    </a>
                  </div>
                  {lawyer.email && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg
                        className="w-5 h-5 text-[#1a2e4f]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href={`mailto:${lawyer.email}`}
                        className="text-[#1a2e4f] hover:text-[#1e3a5f] font-semibold"
                      >
                        {lawyer.email}
                      </a>
                    </div>
                  )}
                  {lawyer.officeAddress && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg
                        className="w-5 h-5 text-[#1a2e4f] mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-gray-700">
                        {lawyer.officeAddress}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1a2e4f] mb-3 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-[#d4af37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Availability & Fees
                </h3>
                <div className="space-y-3">
                  {lawyer.availability && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Availability</p>
                      <p className="text-gray-800 font-semibold">
                        {lawyer.availability}
                      </p>
                    </div>
                  )}
                  {lawyer.consultationFee && (
                    <div className="p-3 bg-[#f4e4bc] rounded-lg border-2 border-[#d4af37]">
                      <p className="text-sm text-gray-600 mb-1">
                        Consultation Fee
                      </p>
                      <p className="text-[#1a2e4f] font-bold text-lg">
                        {lawyer.consultationFee}
                      </p>
                    </div>
                  )}
                  {lawyer.barMembership && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">
                        Bar Membership
                      </p>
                      <p className="text-gray-800 font-semibold text-sm">
                        {lawyer.barMembership}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Languages */}
            {lawyer.languages && lawyer.languages.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#1a2e4f] mb-3 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-[#d4af37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  Languages Spoken
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lawyer.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t-2 border-gray-200">
              <a
                href={`tel:${lawyer.contact}`}
                className="flex-1 bg-gradient-to-r from-[#1a2e4f] to-[#1e3a5f] text-white py-4 px-6 rounded-lg font-bold text-center hover:from-[#1e3a5f] hover:to-[#2d4a6f] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Call Now
              </a>
              {lawyer.email && (
                <a
                  href={`mailto:${lawyer.email}`}
                  className="flex-1 bg-[#d4af37] text-[#1a2e4f] py-4 px-6 rounded-lg font-bold text-center hover:bg-[#c19d2f] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Send Email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
