"use client";

import { RelevantLaw } from "@/types";

interface LawCardProps {
  law: RelevantLaw;
}

export default function LawCard({ law }: LawCardProps) {
  const relevanceColor =
    law.relevance === "high"
      ? "bg-red-50 border-red-300 border-l-4"
      : law.relevance === "medium"
      ? "bg-[#f4e4bc] border-[#d4af37] border-l-4"
      : "bg-blue-50 border-blue-300 border-l-4";

  const relevanceBadgeColor =
    law.relevance === "high"
      ? "bg-red-600 text-white"
      : law.relevance === "medium"
      ? "bg-[#d4af37] text-[#1a2e4f]"
      : "bg-blue-600 text-white";

  return (
    <div
      className={`border rounded-xl p-5 shadow-md hover:shadow-lg transition-all ${relevanceColor}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-[#1a2e4f] text-lg flex-1">{law.title}</h3>
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ml-3 flex-shrink-0 ${relevanceBadgeColor}`}
        >
          {law.relevance}
        </span>
      </div>
      <div className="bg-[#1a2e4f] text-[#d4af37] px-4 py-2 rounded-lg mb-3">
        <p className="text-sm font-semibold">{law.law}</p>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{law.description}</p>
    </div>
  );
}
