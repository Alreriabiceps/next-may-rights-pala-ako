"use client";

import { RiskAssessment } from "@/types";

interface RiskAssessmentProps {
  riskAssessment: RiskAssessment;
}

export default function RiskAssessmentComponent({
  riskAssessment,
}: RiskAssessmentProps) {
  const urgencyColors = {
    high: "bg-red-100 text-red-800 border-red-500",
    medium: "bg-[#f4e4bc] text-[#1a2e4f] border-[#d4af37]",
    low: "bg-blue-100 text-blue-800 border-blue-500",
  };

  const urgencyIcons = {
    high: "⚠️",
    medium: "⚡",
    low: "ℹ️",
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#1a2e4f]">Risk Assessment</h2>
      </div>

      <div className="mb-6">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold ${
            urgencyColors[riskAssessment.urgencyLevel]
          }`}
        >
          <span className="text-xl">
            {urgencyIcons[riskAssessment.urgencyLevel]}
          </span>
          <span className="uppercase tracking-wide">
            {riskAssessment.urgencyLevel} Urgency
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risks of Inaction */}
        <div>
          <h3 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
            <svg
              className="w-5 h-5"
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
            Risks of Not Taking Action
          </h3>
          <ul className="space-y-2">
            {riskAssessment.inactionRisks.map((risk, index) => (
              <li
                key={index}
                className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border-l-4 border-red-500"
              >
                <svg
                  className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-800 text-sm">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits of Action */}
        <div>
          <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Benefits of Taking Action
          </h3>
          <ul className="space-y-2">
            {riskAssessment.actionBenefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border-l-4 border-green-500"
              >
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-800 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
