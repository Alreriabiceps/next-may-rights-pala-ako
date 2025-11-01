"use client";

import { Lawyer } from "@/types";

interface LawyerCardProps {
  lawyer: Lawyer;
  onViewProfile: () => void;
}

export default function LawyerCard({ lawyer, onViewProfile }: LawyerCardProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#1a2e4f] hover:shadow-xl transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-[#1a2e4f] text-lg mb-1 group-hover:text-[#1e3a5f] transition-colors">
            {lawyer.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-[#1a2e4f] bg-[#f4e4bc] px-2 py-1 rounded">
              {lawyer.specialization}
            </span>
            {lawyer.rating && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-[#d4af37]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold text-gray-700">
                  {lawyer.rating}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-4 h-4 text-[#1a2e4f]"
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
          <span className="font-medium">{lawyer.location}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">{lawyer.distance}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <svg
            className="w-4 h-4 text-[#1a2e4f]"
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
            className="text-[#1a2e4f] hover:text-[#1e3a5f] font-semibold transition-colors"
          >
            {lawyer.contact}
          </a>
        </div>

        {lawyer.experience && (
          <p className="text-xs text-gray-500 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#d4af37]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Experience: {lawyer.experience}
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t-2 border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600 font-medium">
            Starting Price:
          </span>
          <span className="text-xl font-bold text-[#1a2e4f]">
            {lawyer.startingPrice}
          </span>
        </div>
        <button
          onClick={onViewProfile}
          className="w-full bg-gradient-to-r from-[#1a2e4f] to-[#1e3a5f] text-white py-2 px-4 rounded-lg font-semibold hover:from-[#1e3a5f] hover:to-[#2d4a6f] transition-all duration-200 text-sm mb-2"
        >
          View Profile
        </button>
        <a
          href={`tel:${lawyer.contact}`}
          className="w-full bg-[#d4af37] text-[#1a2e4f] py-2 px-4 rounded-lg font-semibold hover:bg-[#c19d2f] transition-all duration-200 text-sm text-center block"
        >
          Contact Lawyer
        </a>
      </div>
    </div>
  );
}
