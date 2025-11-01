"use client";

import { CaseSeverity, CaseTimeline } from "@/types";
import { getSeverityColor } from "@/lib/constants";

interface CaseSummaryProps {
  caseType: string;
  severity: CaseSeverity;
  timeline: CaseTimeline;
}

export default function CaseSummary({
  caseType,
  severity,
  timeline,
}: CaseSummaryProps) {
  const severityColor = getSeverityColor(severity.rating);
  const urgencyColor =
    timeline.statuteOfLimitations.daysRemaining &&
    timeline.statuteOfLimitations.daysRemaining < 60
      ? "bg-red-50 border-red-400"
      : "bg-blue-50 border-blue-300";

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
        <h2 className="text-2xl font-bold text-[#1a2e4f]">Buod ng Kaso</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Case Type - Compact */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="w-10 h-10 bg-[#1a2e4f] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-[#d4af37]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Uri ng Kaso
            </p>
            <p className="text-lg font-bold text-[#1a2e4f] truncate">
              {caseType}
            </p>
          </div>
        </div>

        {/* Case Severity - Compact */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="w-10 h-10 bg-[#1a2e4f] rounded-lg flex items-center justify-center flex-shrink-0">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Kalubhaan
            </p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-bold border-2 ${severityColor}`}
            >
              {severity.rating.toUpperCase()}
            </span>
            <span className="ml-2 text-sm text-gray-600">
              Kompleksidad: {severity.complexity}/10
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Info */}
      <div className="mt-4 space-y-3">
        <div className="p-4 bg-[#f4e4bc] rounded-lg border-l-4 border-[#d4af37]">
          <p className="text-sm text-gray-700 font-medium mb-1">
            Epekto sa Pinansyal:
          </p>
          <p className="text-sm text-gray-800">{severity.financialImpact}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-700 font-medium mb-1">
            Pagka-urgente:
          </p>
          <p className="text-sm text-gray-800">{severity.timeSensitivity}</p>
        </div>
      </div>

      {/* Timeline - Compact */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3 mb-3">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Timeline
            </p>
            <p className="text-sm font-semibold text-gray-800">
              Tagal ng Isyu:{" "}
              <span className="font-normal">{timeline.issueDuration}</span>
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              Tinatayang Resolusyon:{" "}
              <span className="font-normal">
                {timeline.estimatedResolution}
              </span>
            </p>
          </div>
        </div>

        {timeline.statuteOfLimitations.applicable &&
          timeline.statuteOfLimitations.daysRemaining && (
            <div className={`rounded-lg p-3 mt-3 border ${urgencyColor}`}>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-sm font-bold text-gray-900">
                  {timeline.statuteOfLimitations.warning ||
                    `Ang preskripsyon ay mag-e-expire sa ${timeline.statuteOfLimitations.daysRemaining} araw`}
                </p>
              </div>
              {timeline.statuteOfLimitations.deadline && (
                <p className="text-xs text-gray-700 font-medium mt-1">
                  Deadline:{" "}
                  {new Date(
                    timeline.statuteOfLimitations.deadline
                  ).toLocaleDateString("en-PH")}
                </p>
              )}
            </div>
          )}

        {/* Milestones */}
        {timeline.milestones.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-300">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">
              Mahahalagang Milestones
            </p>
            <div className="space-y-2">
              {timeline.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      milestone.type === "deadline"
                        ? "bg-red-500"
                        : milestone.type === "warning"
                        ? "bg-[#d4af37]"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <span className="text-gray-600 text-xs">
                    {milestone.date instanceof Date
                      ? milestone.date.toLocaleDateString("en-PH")
                      : milestone.date}
                  </span>
                  <span className="text-gray-800 font-medium text-sm">
                    {milestone.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
