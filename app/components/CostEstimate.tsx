"use client";

import { EstimatedCosts } from "@/types";

interface CostEstimateProps {
  costs: EstimatedCosts;
}

export default function CostEstimate({ costs }: CostEstimateProps) {
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#1a2e4f]">Tinatayang Gastos</h2>
      </div>

      <div className="space-y-4">
        {/* Cost Breakdown */}
        {costs.costBreakdown && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Detalyadong Breakdown ng Gastos:
            </p>
            <p className="text-sm text-gray-700">{costs.costBreakdown}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-gray-600 text-sm font-medium">
                Bayad sa Konsultasyon
              </span>
            </div>
            <p className="text-xl font-bold text-[#1a2e4f]">
              {costs.consultationFee}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Una o paunang konsultasyon sa abogado
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-gray-600 text-sm font-medium">
                Bayad sa Pag-file
              </span>
            </div>
            <p className="text-xl font-bold text-[#1a2e4f]">
              {costs.filingFees}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Bayad sa korte o ahensya para sa pag-file ng kaso
            </p>
          </div>
        </div>

        {/* Additional Costs */}
        {costs.additionalCosts && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm font-semibold text-yellow-900 mb-1">
              Iba Pang Gastos:
            </p>
            <p className="text-sm text-gray-700">{costs.additionalCosts}</p>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#1a2e4f] to-[#1e3a5f] rounded-lg border-2 border-[#d4af37]">
          <span className="text-white font-bold text-lg">
            Kabuuang Tinataya
          </span>
          <span className="text-2xl font-bold text-[#d4af37]">
            {costs.totalEstimated}
          </span>
        </div>

        {/* Payment Plan */}
        {costs.paymentPlan && (
          <div className="p-4 bg-[#f4e4bc] rounded-lg border-l-4 border-[#d4af37]">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-[#1a2e4f] mt-0.5 flex-shrink-0"
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
              <div>
                <p className="text-sm font-semibold text-[#1a2e4f] mb-1">
                  Payment Plan:
                </p>
                <p className="text-sm text-gray-800">{costs.paymentPlan}</p>
              </div>
            </div>
          </div>
        )}

        {/* Note */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 italic">
            <strong>Paalala:</strong> Ang mga gastos na ito ay mga pagtatantiya
            lamang. Ang aktwal na gastos ay maaaring mag-iba depende sa pagiging
            kumplikado ng kaso, abogado na pipiliin mo, at iba pang mga
            kadahilanan. Laging tanungin ang abogado tungkol sa kanilang fee
            structure bago magpasya.
          </p>
        </div>
      </div>
    </div>
  );
}
