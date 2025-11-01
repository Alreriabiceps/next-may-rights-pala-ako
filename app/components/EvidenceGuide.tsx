"use client";

import { EvidenceItem } from "@/types";

interface EvidenceGuideProps {
  evidenceGuide: EvidenceItem[];
}

export default function EvidenceGuide({ evidenceGuide }: EvidenceGuideProps) {
  if (!evidenceGuide || evidenceGuide.length === 0) {
    return null;
  }

  const importanceColors = {
    critical: "bg-red-50 border-red-500 text-red-800",
    important: "bg-[#f4e4bc] border-[#d4af37] text-[#1a2e4f]",
    helpful: "bg-blue-50 border-blue-500 text-blue-800",
  };

  const importanceIcons = {
    critical: "🔴",
    important: "🟡",
    helpful: "🔵",
  };

  const importanceLabels = {
    critical: "Critical",
    important: "Important",
    helpful: "Helpful",
  };

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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#1a2e4f]">
          Evidence Collection Guide
        </h2>
      </div>

      <div className="space-y-4">
        {evidenceGuide.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              importanceColors[item.importance]
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <span className="text-xl">
                  {importanceIcons[item.importance]}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg">{item.item}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded-full uppercase ${
                      importanceColors[item.importance]
                    }`}
                  >
                    {importanceLabels[item.importance]}
                  </span>
                </div>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-[#1a2e4f] mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-gray-700">
            <strong>Tip:</strong> Collect and organize all evidence in a safe
            place. Make copies of important documents and keep originals secure.
            Take photos or videos when applicable as they can serve as strong
            evidence.
          </p>
        </div>
      </div>
    </div>
  );
}
