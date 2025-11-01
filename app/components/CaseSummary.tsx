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
      ? "bg-red-50 border-red-400 border-2"
      : "bg-blue-50 border-blue-300 border-2";

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-[#d4af37]">
        <div className="w-12 h-12 bg-[#1a2e4f] rounded-lg flex items-center justify-center">
          <svg
            className="w-7 h-7 text-[#d4af37]"
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
        <h2 className="text-3xl font-bold text-[#1a2e4f]">Case Summary</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Case Type */}
        <div className="bg-gradient-to-br from-[#1a2e4f] to-[#1e3a5f] rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
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
            <p className="text-sm text-gray-300 uppercase tracking-wide">
              Case Type
            </p>
          </div>
          <p className="text-2xl font-bold">{caseType}</p>
        </div>

        {/* Case Severity */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-3">
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
            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
              Case Severity
            </p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${severityColor}`}
            >
              {severity.rating.toUpperCase()}
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-xs text-gray-600 font-medium">Complexity</p>
                <p className="text-xs text-gray-700 font-bold">
                  {severity.complexity}/10
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    severity.complexity >= 7
                      ? "bg-red-500"
                      : severity.complexity >= 4
                      ? "bg-[#d4af37]"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${(severity.complexity / 10) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              {severity.financialImpact}
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">
              {severity.timeSensitivity}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-3">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
              Case Timeline
            </p>
          </div>
          <p className="text-lg font-bold text-[#1a2e4f] mb-4">
            Duration: {timeline.issueDuration}
          </p>

          {timeline.statuteOfLimitations.applicable &&
            timeline.statuteOfLimitations.daysRemaining && (
              <div className={`rounded-lg p-4 mb-4 ${urgencyColor}`}>
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-red-600"
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
                      `Statute expires in ${timeline.statuteOfLimitations.daysRemaining} days`}
                  </p>
                </div>
                {timeline.statuteOfLimitations.deadline && (
                  <p className="text-xs text-gray-700 font-medium">
                    Deadline:{" "}
                    {new Date(
                      timeline.statuteOfLimitations.deadline
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

          <p className="text-xs text-gray-600 font-medium">
            Estimated Resolution:{" "}
            <span className="text-[#1a2e4f] font-bold">
              {timeline.estimatedResolution}
            </span>
          </p>
        </div>
      </div>

      {/* Milestones */}
      {timeline.milestones.length > 0 && (
        <div className="mt-8 pt-8 border-t-2 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <p className="text-sm font-bold text-[#1a2e4f] uppercase tracking-wide">
              Important Milestones
            </p>
          </div>
          <div className="space-y-3">
            {timeline.milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border-l-4 border-[#1a2e4f]"
              >
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    milestone.type === "deadline"
                      ? "bg-red-500"
                      : milestone.type === "warning"
                      ? "bg-[#d4af37]"
                      : "bg-blue-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <span className="text-sm text-gray-600 font-medium">
                    {milestone.date instanceof Date
                      ? milestone.date.toLocaleDateString()
                      : milestone.date}
                    :
                  </span>
                  <span className="text-sm text-gray-800 font-semibold ml-2">
                    {milestone.event}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
