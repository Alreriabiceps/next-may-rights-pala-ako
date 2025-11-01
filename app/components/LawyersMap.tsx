"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Lawyer } from "@/types";

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface LawyersMapProps {
  lawyers: Lawyer[];
}

export default function LawyersMap({ lawyers }: LawyersMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Import Leaflet only on client side
    import("leaflet").then((leaflet) => {
      setL(leaflet);
      
      // Fix for default marker icon issue
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });
  }, []);

  // Calculate center of all lawyers' locations for initial map view
  const validLawyers = lawyers.filter(
    (lawyer) => lawyer.latitude && lawyer.longitude
  );

  const center =
    validLawyers.length > 0
      ? [
          validLawyers.reduce((sum, lawyer) => sum + (lawyer.latitude || 0), 0) /
            validLawyers.length,
          validLawyers.reduce((sum, lawyer) => sum + (lawyer.longitude || 0), 0) /
            validLawyers.length,
        ]
      : [14.5995, 120.9842]; // Manila default

  // Create custom icon
  const createCustomIcon = () => {
    if (!L) return null;
    
    return L.divIcon({
      className: "custom-marker",
      html: `
        <div style="
          background-color: #1a2e4f;
          width: 40px;
          height: 40px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid #d4af37;
          position: relative;
        ">
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            color: white;
            font-weight: bold;
            font-size: 20px;
          ">⚖</div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  };

  if (!isClient || !L) {
    return (
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-[#d4af37] p-6">
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1a2e4f]">
              Lokasyon ng mga Abogado
            </h2>
            <p className="text-gray-600 text-sm">
              Pindutin ang mga marker para makita ang impormasyon
            </p>
          </div>
        </div>
        <div className="p-6 flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2e4f] mx-auto mb-4"></div>
            <p className="text-gray-600">Naglo-load ang mapa...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-[#d4af37] p-6">
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
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1a2e4f]">
            Lokasyon ng mga Abogado
          </h2>
          <p className="text-gray-600 text-sm">
            Pindutin ang mga marker para makita ang impormasyon
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="relative" style={{ height: "500px", borderRadius: "12px", overflow: "hidden" }}>
          <style jsx global>{`
            @import url("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
            .leaflet-container {
              height: 100%;
              width: 100%;
              z-index: 1;
            }
            .custom-marker {
              background: transparent !important;
              border: none !important;
            }
            .leaflet-popup-content-wrapper {
              border-radius: 8px;
              padding: 0;
            }
            .leaflet-popup-content {
              margin: 0;
              padding: 12px;
              min-width: 200px;
            }
          `}</style>
          <MapContainer
            center={center as [number, number]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {validLawyers.map((lawyer) => (
              <Marker
                key={lawyer.id}
                position={[lawyer.latitude!, lawyer.longitude!]}
                icon={createCustomIcon()}
              >
                <Popup>
                  <div className="p-3 max-w-xs">
                    <h3 className="font-bold text-[#1a2e4f] text-lg mb-2">
                      {lawyer.name}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Specialization:</span>{" "}
                        {lawyer.specialization}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Location:</span>{" "}
                        {lawyer.location}
                      </p>
                      {lawyer.officeAddress && (
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Address:</span>{" "}
                          {lawyer.officeAddress}
                        </p>
                      )}
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Contact:</span>{" "}
                        <a
                          href={`tel:${lawyer.contact}`}
                          className="text-blue-600 hover:underline"
                        >
                          {lawyer.contact}
                        </a>
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => {
                            window.open(
                              `tel:${lawyer.contact}`,
                              "_self"
                            );
                          }}
                          className="bg-[#1a2e4f] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e3a5f] transition-colors"
                        >
                          Tawagan
                        </button>
                        {lawyer.officeAddress && (
                          <button
                            onClick={() => {
                              window.open(
                                `https://www.openstreetmap.org/search?query=${encodeURIComponent(
                                  lawyer.officeAddress || ""
                                )}`,
                                "_blank"
                              );
                            }}
                            className="bg-[#d4af37] text-[#1a2e4f] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#c19d2f] transition-colors"
                          >
                            Direksyon
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
