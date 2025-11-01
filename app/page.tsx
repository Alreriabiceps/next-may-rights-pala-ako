"use client";

import { useState } from "react";
import { CaseAnalysis } from "@/types";
import ResultsView from "./components/ResultsView";

// TypeScript interfaces for Web Speech API
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionError {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionError) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

export default function Home() {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<CaseAnalysis | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [transcript, setTranscript] = useState("");
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleVoiceRecording = () => {
    // Check browser support
    const SpeechRecognitionConstructor =
      (
        window as typeof window & {
          SpeechRecognition?: SpeechRecognitionConstructor;
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }
      ).SpeechRecognition ||
      (
        window as typeof window & {
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }
      ).webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      alert(
        "Voice recording ay hindi supported sa inyong browser. Pakiusap gumamit ng Chrome, Edge, o Safari."
      );
      return;
    }

    if (!recognition) {
      // Initialize speech recognition
      const rec = new SpeechRecognitionConstructor();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "fil-PH"; // Filipino/Tagalog

      rec.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript((prev) => prev + finalTranscript);
        if (interimTranscript) {
          setDescription(transcript + finalTranscript + interimTranscript);
        }
      };

      rec.onerror = (event: SpeechRecognitionError) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
        if (event.error === "no-speech") {
          alert("Walang speech na narinig. Subukan ulit.");
        } else if (event.error === "not-allowed") {
          alert(
            "Voice recording ay hindi pinayagan. Pakiusap i-enable ang microphone permissions."
          );
        }
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }

    if (isRecording) {
      // Stop recording
      recognition?.stop();
      setIsRecording(false);
    } else {
      // Start recording
      setTranscript("");
      setDescription("");
      recognition?.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("description", description);
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(
          errorData.error || `Analysis failed with status ${response.status}`
        );
      }

      const analysis = await response.json();
      setResults(analysis);
    } catch (error) {
      console.error("Error analyzing case:", error);
      alert(
        `Hindi makumpleto ang pagsusuri ng inyong kaso: ${
          error instanceof Error ? error.message : "Hindi kilalang error"
        }. Pakisuri ang console para sa detalye.`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (results) {
    return <ResultsView results={results} onReset={() => setResults(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf9f6] via-[#f5f4f0] to-[#efece6]">
      {/* Header with law-themed design */}
      <div className="bg-gradient-to-r from-[#1a2e4f] via-[#1e3a5f] to-[#1a2e4f] text-white shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Scales of Justice Icon */}
            <div className="relative">
              <svg
                className="w-16 h-16 text-[#d4af37]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                <path d="M12 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-6-1h2v2H6v-2zm12 0h2v2h-2v-2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 tracking-tight">
            Alamin ang Inyong Karapatan
          </h1>
          <p className="text-xl md:text-2xl text-center text-gray-200 mb-2 font-light">
            Propesyunal na Gabay sa Legal Batay sa Batas ng Pilipinas
          </p>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mt-4">
            Unawain ang inyong mga karapatan sa legal, hanapin ang mga kaugnay
            na batas, at makipag-ugnayan sa mga kwalipikadong abogado
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#1a2e4f] to-[#1e3a5f] px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#1a2e4f]"
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
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Impormasyon ng Kaso
                </h2>
                <p className="text-gray-300 text-sm">
                  Ilarawan ang inyong sitwasyon nang detalyado
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div>
              {/* Input Mode Toggle */}
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-[#1a2e4f] uppercase tracking-wide"
                >
                  Ilarawan ang Inyong Sitwasyon{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setInputMode("text")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      inputMode === "text"
                        ? "bg-[#1a2e4f] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 inline-block mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Type
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode("voice")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      inputMode === "voice"
                        ? "bg-[#1a2e4f] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 inline-block mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                    Voice
                  </button>
                </div>
              </div>

              {/* Text Input */}
              {inputMode === "text" && (
                <textarea
                  id="description"
                  rows={12}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Halimbawa: Nagtatanim ako ng palay sa isang bukid sa loob ng 20 taon. Namatay na ang orihinal na may-ari, at ngayon ay may nagke-claim na pagmamay-ari. Ano ang aking mga karapatan?"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#1a2e4f] resize-none text-gray-800 placeholder-gray-400 transition-all duration-200 bg-gray-50"
                  required
                />
              )}

              {/* Voice Input */}
              {inputMode === "voice" && (
                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      id="description"
                      rows={8}
                      value={transcript || description}
                      onChange={(e) => {
                        setTranscript(e.target.value);
                        setDescription(e.target.value);
                      }}
                      placeholder="Click the microphone button below to start recording your issue..."
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#1a2e4f] resize-none text-gray-800 placeholder-gray-400 transition-all duration-200 bg-gray-50"
                      required
                    />
                    {isRecording && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 text-red-500">
                        <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-semibold">
                          Recording...
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleVoiceRecording}
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 animate-pulse"
                          : "bg-[#1a2e4f] hover:bg-[#1e3a5f]"
                      } text-white shadow-lg hover:shadow-xl`}
                    >
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {isRecording ? (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                            />
                          </>
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          />
                        )}
                      </svg>
                    </button>
                  </div>

                  {transcript && (
                    <p className="text-sm text-gray-600 text-center">
                      Transcript ready. You can edit it if needed before
                      submitting.
                    </p>
                  )}
                </div>
              )}

              <p className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
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
                Maging detalyado hangga&apos;t maaari. Isama ang mga petsa,
                lokasyon, at mahahalagang pangyayari.
              </p>
            </div>

            <div>
              <label
                htmlFor="documents"
                className="block text-sm font-semibold text-[#1a2e4f] mb-3 uppercase tracking-wide"
              >
                Mga Sumusuportang Dokumento{" "}
                <span className="text-gray-400 normal-case">(Opsyonal)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="documents"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#1a2e4f] transition-all duration-200 bg-gray-50 text-sm file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1a2e4f] file:text-white hover:file:bg-[#1e3a5f] file:cursor-pointer file:transition-colors"
                />
              </div>
              {files.length > 0 && (
                <div className="mt-3 p-3 bg-[#f4e4bc] border border-[#d4af37] rounded-lg">
                  <p className="text-sm font-medium text-[#1a2e4f] mb-1">
                    {files.length} file(s) ang napili:
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {files.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {f.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
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
                Sinusuportahang format: PDF, DOC, DOCX, JPG, PNG (Max 10MB bawat
                file)
              </p>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !description.trim()}
              className="w-full bg-gradient-to-r from-[#1a2e4f] to-[#1e3a5f] text-white py-5 px-8 rounded-lg font-bold text-lg hover:from-[#1e3a5f] hover:to-[#2d4a6f] focus:outline-none focus:ring-4 focus:ring-[#d4af37] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sinusuri ang Inyong Kaso...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="w-6 h-6"
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
                  Suriin ang Aking Karapatan
                </span>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-2">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="font-semibold text-[#1a2e4f]">Legal Disclaimer</p>
          </div>
          <p className="text-gray-600">
            Ang tool na ito ay nagbibigay lamang ng pangkalahatang impormasyong
            legal at hindi ito legal na payo.
          </p>
          <p className="mt-1 text-gray-600">
            Pakikonsulta sa isang kwalipikadong abogado para sa inyong
            partikular na sitwasyon.
          </p>
        </div>
      </div>
    </div>
  );
}
