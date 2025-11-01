"use client";

import { useState } from "react";
import { CaseAnalysis, Lawyer } from "@/types";
import CaseSummary from "./CaseSummary";
import LawCard from "./LawCard";
import LawyerCard from "./LawyerCard";
import LawyerProfileModal from "./LawyerProfileModal";
import CostEstimate from "./CostEstimate";
import GovernmentAgencies from "./GovernmentAgencies";
import LawyersMap from "./LawyersMap";

interface ResultsViewProps {
  results: CaseAnalysis;
  onReset: () => void;
}

export default function ResultsView({ results, onReset }: ResultsViewProps) {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleViewProfile = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setIsProfileModalOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileModalOpen(false);
    setSelectedLawyer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf9f6] via-[#f5f4f0] to-[#efece6]">
      {selectedLawyer && (
        <LawyerProfileModal
          lawyer={selectedLawyer}
          isOpen={isProfileModalOpen}
          onClose={handleCloseProfile}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onReset}
            className="mb-6 text-[#1a2e4f] hover:text-[#1e3a5f] font-semibold flex items-center gap-2 transition-colors group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Bumalik sa Form
          </button>

          <div className="bg-gradient-to-r from-[#1a2e4f] via-[#1e3a5f] to-[#1a2e4f] rounded-2xl shadow-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#d4af37] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#1a2e4f]"
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
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Kumpleto na ang Pagsusuri ng Kaso
                </h1>
                <p className="text-gray-200 text-lg">
                  Batay sa batas ng Pilipinas at sa inyong sitwasyon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Case Summary Section */}
        <CaseSummary
          caseType={results.caseType}
          severity={results.severity}
          timeline={results.timeline}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Relevant Laws Section */}
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
                Mga Kaugnay na Batas
              </h2>
            </div>
            <div className="space-y-4">
              {results.relevantLaws.map((law, index) => (
                <LawCard key={index} law={law} />
              ))}
            </div>
          </div>

          {/* Your Rights Section */}
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1a2e4f]">
                Inyong Mga Karapatan
              </h2>
            </div>
            <ul className="space-y-4">
              {results.rights.map((right, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 bg-[#f4e4bc] rounded-lg border-l-4 border-[#d4af37]"
                >
                  <svg
                    className="w-6 h-6 text-[#1a2e4f] mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800 font-medium">{right}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lawyers Map Section */}
        <LawyersMap lawyers={results.lawyers} />

        {/* Nearby Lawyers Section */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 mt-6">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1a2e4f]">
              Mga Inirerekomendang Abogado
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.lawyers.map((lawyer, index) => (
              <LawyerCard
                key={lawyer.id || index}
                lawyer={lawyer}
                onViewProfile={() => handleViewProfile(lawyer)}
              />
            ))}
          </div>
        </div>

        {/* Essential Documents Section */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 mt-6">
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
              Mga Mahahalagang Dokumento
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.essentialDocuments.map((doc, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-[#1a2e4f] border-gray-300 rounded focus:ring-[#d4af37] focus:ring-2"
                />
                <span className="text-gray-800 font-medium">{doc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cost Estimate Section */}
        {results.estimatedCosts && (
          <div className="mt-6">
            <CostEstimate costs={results.estimatedCosts} />
          </div>
        )}

        {/* Government Agencies Section */}
        {results.governmentAgencies &&
          results.governmentAgencies.length > 0 && (
            <div className="mt-6">
              <GovernmentAgencies agencies={results.governmentAgencies} />
            </div>
          )}

        {/* Legal Disclaimer */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-2 border-[#d4af37]">
          <div className="flex items-center justify-center gap-3 mb-3">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="font-bold text-[#1a2e4f] text-lg">Legal Disclaimer</p>
          </div>
          <p className="text-center text-gray-700 mb-2">
            Ang pagsusuring ito ay nagbibigay lamang ng pangkalahatang
            impormasyong legal batay sa batas ng Pilipinas at hindi ito legal na
            payo.
          </p>
          <p className="text-center text-gray-700 font-medium">
            Pakikonsulta sa isang kwalipikadong abogado para sa inyong
            partikular na sitwasyon.
          </p>
        </div>
      </div>
    </div>
  );
}
