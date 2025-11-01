export interface RelevantLaw {
  title: string;
  law: string;
  description: string;
  relevance: "high" | "medium" | "low";
}

export interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  location: string;
  contact: string;
  email?: string;
  startingPrice: string;
  distance: string;
  rating?: number;
  experience?: string;
  // Detailed profile fields
  bio?: string;
  education?: string[];
  barMembership?: string;
  practiceAreas?: string[];
  languages?: string[];
  officeAddress?: string;
  consultationFee?: string;
  availability?: string;
  casesHandled?: number;
  successRate?: string;
  // Map coordinates
  latitude?: number;
  longitude?: number;
}

export interface CaseSeverity {
  rating: "low" | "medium" | "high";
  complexity: number; // 1-10
  financialImpact: string;
  timeSensitivity: string;
}

export interface StatuteOfLimitations {
  applicable: boolean;
  deadline: Date | null;
  daysRemaining: number | null;
  warning: string | null;
}

export interface TimelineMilestone {
  date: Date | string;
  event: string;
  type: "deadline" | "milestone" | "warning";
}

export interface CaseTimeline {
  issueDuration: string; // e.g., "20 years"
  statuteOfLimitations: StatuteOfLimitations;
  estimatedResolution: string;
  milestones: TimelineMilestone[];
}

export interface NextStep {
  action: string;
  priority: "high" | "medium" | "low";
  deadline?: Date | string | null;
}

export interface EstimatedCosts {
  consultationFee: string;
  filingFees: string;
  totalEstimated: string;
  paymentPlan?: string;
  additionalCosts?: string;
  costBreakdown?: string;
}

export interface RiskAssessment {
  inactionRisks: string[];
  actionBenefits: string[];
  urgencyLevel: "low" | "medium" | "high";
}

export interface GovernmentAgency {
  name: string;
  purpose: string;
  contact: string;
  website?: string;
}

export interface EvidenceItem {
  item: string;
  description: string;
  importance: "critical" | "important" | "helpful";
}

export interface CaseAnalysis {
  caseType: string; // Property, Criminal, Labor, etc.
  severity: CaseSeverity;
  timeline: CaseTimeline;
  relevantLaws: RelevantLaw[];
  rights: string[];
  lawyers: Lawyer[];
  essentialDocuments: string[]; // Simplified from requiredDocuments
  nextSteps: NextStep[];
  estimatedCosts?: EstimatedCosts;
  riskAssessment?: RiskAssessment;
  governmentAgencies?: GovernmentAgency[];
  evidenceGuide?: EvidenceItem[];
}
