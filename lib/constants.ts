import { RelevantLaw, Lawyer } from "@/types";

// Mock Philippine Law Database
export const PHILIPPINE_LAWS: RelevantLaw[] = [
  {
    title: "Prescription and Possession Rights",
    law: "Civil Code of the Philippines, Article 1134",
    description:
      "Ownership and other real rights over immovable property are acquired by ordinary prescription through possession of ten years.",
    relevance: "high",
  },
  {
    title: "Extraordinary Prescription",
    law: "Civil Code of the Philippines, Article 1137",
    description:
      "Ownership and other real rights over immovable property are acquired by extraordinary prescription through uninterrupted adverse possession for thirty years.",
    relevance: "high",
  },
  {
    title: "Adverse Possession Requirements",
    law: "Civil Code of the Philippines, Article 1123",
    description:
      "For prescription to run, the possession must be in the concept of owner, public, peaceful, and uninterrupted.",
    relevance: "high",
  },
  {
    title: "Labor Rights Protection",
    law: "Labor Code of the Philippines, Article 279",
    description:
      "Security of tenure - employees shall be entitled to security of tenure.",
    relevance: "medium",
  },
  {
    title: "Property Rights",
    law: "1987 Philippine Constitution, Article III, Section 1",
    description:
      "No person shall be deprived of life, liberty, or property without due process of law.",
    relevance: "high",
  },
];

// Mock Lawyer Database
export const LAWYERS: Lawyer[] = [
  {
    id: "lawyer-1",
    name: "Atty. Maria Santos",
    specialization: "Property Law",
    location: "Manila",
    contact: "+63 912 345 6789",
    email: "maria.santos@lawfirm.ph",
    startingPrice: "₱5,000",
    distance: "2.5 km",
    rating: 4.8,
    experience: "15 years",
    bio: "A seasoned property law attorney with over 15 years of experience in real estate disputes, land ownership cases, and property rights. Maria has successfully handled hundreds of cases involving adverse possession, property disputes, and land registration matters.",
    education: [
      "Juris Doctor - University of the Philippines College of Law (2008)",
      "Bachelor of Arts in Political Science - Ateneo de Manila University (2004)",
    ],
    barMembership: "Integrated Bar of the Philippines (IBP) - Manila Chapter",
    practiceAreas: [
      "Property Disputes",
      "Land Ownership",
      "Adverse Possession",
      "Real Estate Transactions",
      "Land Registration",
    ],
    languages: ["Filipino", "English", "Tagalog"],
    officeAddress: "123 Legal Plaza, Ermita, Manila 1000",
    consultationFee: "₱3,000 (1 hour)",
    availability: "Monday - Friday, 9:00 AM - 6:00 PM",
    casesHandled: 450,
    successRate: "87%",
  },
  {
    id: "lawyer-2",
    name: "Atty. Juan Dela Cruz",
    specialization: "Property Law",
    location: "Quezon City",
    contact: "+63 917 654 3210",
    email: "juan.delacruz@lawfirm.ph",
    startingPrice: "₱4,500",
    distance: "5.2 km",
    rating: 4.6,
    experience: "12 years",
    bio: "Specializing in property law and civil litigation, Juan has built a reputation for thorough legal research and client-focused representation. He has particular expertise in prescription and possession rights cases.",
    education: [
      "Juris Doctor - Ateneo Law School (2011)",
      "Bachelor of Science in Business Administration - De La Salle University (2007)",
    ],
    barMembership:
      "Integrated Bar of the Philippines (IBP) - Quezon City Chapter",
    practiceAreas: [
      "Property Rights",
      "Civil Litigation",
      "Contract Disputes",
      "Property Transfer",
      "Estate Planning",
    ],
    languages: ["Filipino", "English"],
    officeAddress: "456 QC Business Center, Quezon City 1100",
    consultationFee: "₱2,500 (1 hour)",
    availability: "Monday - Saturday, 8:00 AM - 7:00 PM",
    casesHandled: 320,
    successRate: "82%",
  },
  {
    id: "lawyer-3",
    name: "Atty. Ana Garcia",
    specialization: "Civil Law",
    location: "Makati",
    contact: "+63 918 987 6543",
    email: "ana.garcia@lawfirm.ph",
    startingPrice: "₱6,000",
    distance: "8.1 km",
    rating: 4.9,
    experience: "20 years",
    bio: "With two decades of legal practice, Ana Garcia is one of the most respected civil law attorneys in the Philippines. She has extensive experience in complex civil cases and has represented clients in landmark property rights decisions.",
    education: [
      "Juris Doctor - University of the Philippines College of Law (2003)",
      "Master of Laws - Harvard Law School (2005)",
      "Bachelor of Arts in History - UP Diliman (1999)",
    ],
    barMembership:
      "Integrated Bar of the Philippines (IBP) - Makati Chapter, American Bar Association",
    practiceAreas: [
      "Complex Civil Litigation",
      "Property Law",
      "Constitutional Law",
      "Administrative Law",
      "Appellate Practice",
    ],
    languages: ["Filipino", "English", "Spanish"],
    officeAddress: "789 Ayala Avenue, Makati City 1200",
    consultationFee: "₱4,000 (1 hour)",
    availability: "Monday - Friday, 10:00 AM - 5:00 PM",
    casesHandled: 680,
    successRate: "91%",
  },
  {
    id: "lawyer-4",
    name: "Atty. Roberto Mendoza",
    specialization: "Property Law",
    location: "Pasig",
    contact: "+63 915 123 4567",
    email: "roberto.mendoza@lawfirm.ph",
    startingPrice: "₱3,500",
    distance: "12.3 km",
    rating: 4.5,
    experience: "8 years",
    bio: "A dedicated property law attorney committed to helping clients protect their property rights. Roberto specializes in cases involving land disputes, property claims, and real estate matters.",
    education: [
      "Juris Doctor - San Beda College of Law (2015)",
      "Bachelor of Arts in Political Science - University of Santo Tomas (2011)",
    ],
    barMembership: "Integrated Bar of the Philippines (IBP) - Pasig Chapter",
    practiceAreas: [
      "Property Disputes",
      "Land Registration",
      "Real Estate Law",
      "Property Rights",
      "Ejectment Cases",
    ],
    languages: ["Filipino", "English"],
    officeAddress: "321 Ortigas Center, Pasig City 1600",
    consultationFee: "₱2,000 (1 hour)",
    availability: "Monday - Friday, 9:00 AM - 6:00 PM",
    casesHandled: 180,
    successRate: "79%",
  },
  {
    id: "lawyer-5",
    name: "Atty. Liza Fernandez",
    specialization: "Real Estate Law",
    location: "Mandaluyong",
    contact: "+63 919 555 1234",
    email: "liza.fernandez@lawfirm.ph",
    startingPrice: "₱5,500",
    distance: "6.7 km",
    rating: 4.7,
    experience: "14 years",
    bio: "An expert in real estate law with extensive experience in property transactions, land disputes, and property rights litigation. Liza is known for her attention to detail and successful resolution of complex property matters.",
    education: [
      "Juris Doctor - University of Santo Tomas Faculty of Civil Law (2009)",
      "Bachelor of Science in Real Estate Management - UST (2005)",
    ],
    barMembership:
      "Integrated Bar of the Philippines (IBP) - Mandaluyong Chapter",
    practiceAreas: [
      "Real Estate Law",
      "Property Transactions",
      "Land Development",
      "Property Rights",
      "Real Estate Investment",
    ],
    languages: ["Filipino", "English", "Mandarin"],
    officeAddress: "555 EDSA Corner Shaw Blvd, Mandaluyong City 1550",
    consultationFee: "₱3,500 (1 hour)",
    availability: "Monday - Friday, 8:00 AM - 6:00 PM",
    casesHandled: 390,
    successRate: "85%",
  },
];

// Case Type Categories
export const CASE_TYPES = [
  "Property",
  "Criminal",
  "Labor",
  "Family Law",
  "Civil",
  "Administrative",
  "Tax",
  "Corporate",
];

// Helper function to get severity color
export const getSeverityColor = (rating: "low" | "medium" | "high") => {
  switch (rating) {
    case "low":
      return "bg-green-100 text-green-800 border-green-400 border-2";
    case "medium":
      return "bg-[#f4e4bc] text-[#1a2e4f] border-[#d4af37] border-2";
    case "high":
      return "bg-red-100 text-red-800 border-red-400 border-2";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300 border-2";
  }
};

// Helper function to get priority color
export const getPriorityColor = (priority: "high" | "medium" | "low") => {
  switch (priority) {
    case "high":
      return "bg-red-50 text-red-700 border-red-200";
    case "medium":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "low":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};
