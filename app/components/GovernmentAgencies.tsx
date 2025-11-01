"use client";

import { GovernmentAgency } from "@/types";

interface GovernmentAgenciesProps {
  agencies: GovernmentAgency[];
}

export default function GovernmentAgencies({
  agencies,
}: GovernmentAgenciesProps) {
  if (!agencies || agencies.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#d4af37]">
        <div className="w-10 h-10 bg-[#1a2e4f] rounded-lg flex items-center justify-center">
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#1a2e4f]">
          Government Agencies
        </h2>
      </div>

      <div className="space-y-4">
        {agencies.map((agency, index) => (
          <div
            key={index}
            className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#1a2e4f] hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-[#1a2e4f]">
                {agency.name}
              </h3>
            </div>
            <p className="text-gray-700 mb-3">{agency.purpose}</p>
            <div className="flex flex-wrap items-center gap-4">
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
                  href={`tel:${agency.contact}`}
                  className="text-[#1a2e4f] hover:text-[#1e3a5f] font-semibold"
                >
                  {agency.contact}
                </a>
              </div>
              {agency.website && (
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
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <a
                    href={agency.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a2e4f] hover:text-[#1e3a5f] font-semibold underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
