import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CaseAnalysis } from "@/types";
import { PHILIPPINE_LAWS, LAWYERS } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const description = formData.get("description") as string;

    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    // Get Gemini API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        {
          error:
            "API key not configured. Please set GEMINI_API_KEY environment variable.",
        },
        { status: 500 }
      );
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);

    // Check available models via REST API
    let availableModelName = null;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(
          "Available models from API:",
          JSON.stringify(data, null, 2)
        );

        if (data.models && data.models.length > 0) {
          // Find a model that supports generateContent
          const workingModel = data.models.find(
            (m: { name?: string; supportedGenerationMethods?: string[] }) =>
              m.supportedGenerationMethods?.includes("generateContent") &&
              (m.name?.includes("gemini-pro") ||
                m.name?.includes("gemini-1.5-flash"))
          );

          if (workingModel && workingModel.name) {
            // Extract model name (remove 'models/' prefix)
            availableModelName = workingModel.name.includes("/")
              ? workingModel.name.split("/").pop() || null
              : workingModel.name.replace("models/", "");
            console.log(`Found available model: ${availableModelName}`);
          } else {
            // Try the first available model
            const firstModel = data.models.find(
              (m: { supportedGenerationMethods?: string[] }) =>
                m.supportedGenerationMethods?.includes("generateContent")
            );
            if (
              firstModel &&
              "name" in firstModel &&
              typeof firstModel.name === "string"
            ) {
              availableModelName = firstModel.name.includes("/")
                ? firstModel.name.split("/").pop() || null
                : firstModel.name.replace("models/", "");
              console.log(`Using first available model: ${availableModelName}`);
            }
          }
        }
      }
    } catch (error) {
      console.log("Could not fetch available models:", error);
    }

    // Prepare the prompt for legal analysis
    const prompt = createLegalAnalysisPrompt(description, PHILIPPINE_LAWS);

    // Try available models in order
    let result;
    let lastError: Error | null = null;
    const modelsToTry = availableModelName
      ? [availableModelName, "gemini-pro", "gemini-1.5-flash"]
      : ["gemini-pro", "gemini-1.5-flash"];

    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        result = await model.generateContent(prompt);
        console.log(`Successfully using model: ${modelName}`);
        break;
      } catch (error) {
        console.log(`Model ${modelName} failed:`, (error as Error).message);
        lastError = error as Error;
        continue;
      }
    }

    if (!result) {
      throw new Error(
        `No Gemini models available. Tried: ${modelsToTry.join(", ")}. ` +
          `Last error: ${lastError?.message}. ` +
          `You may need to enable billing. Visit https://makersuite.google.com/app/apikey to check your API key settings.`
      );
    }

    // Call Gemini API with text only
    const response = await result.response;
    const analysisText = response.text();

    // Parse the Gemini response and structure it
    const analysis = parseGeminiResponse(analysisText, description);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing case:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Full error details:", error);
    return NextResponse.json(
      { error: `Failed to analyze request: ${errorMessage}` },
      { status: 500 }
    );
  }
}

function createLegalAnalysisPrompt(
  description: string,
  availableLaws: typeof PHILIPPINE_LAWS
): string {
  const lawsContext = availableLaws
    .map((law) => `- ${law.title}: ${law.law}\n  ${law.description}`)
    .join("\n\n");

  return `Ikaw ay isang legal na eksperto na dalubhasa sa batas ng Pilipinas. Suriin ang sumusunod na legal na sitwasyon at magbigay ng komprehensibong pagsusuri.

SITWASYON NG USER:
${description}

MGA AVAILABLE NA BATAS NG PILIPINAS PARA SA REFERENCE:
${lawsContext}

Pakiusap na suriin ang kasong ito at magbigay ng JSON response gamit ang sumusunod na structure. IMPORTANTE: Lahat ng teksto sa response ay dapat nasa Tagalog/Filipino.
{
  "caseType": "Property|Criminal|Labor|Family Law|Civil|Administrative|Tax|Corporate",
  "severity": {
    "rating": "low|medium|high",
    "complexity": <number 1-10>,
    "financialImpact": "<detailed description sa Tagalog>",
    "timeSensitivity": "<detailed description sa Tagalog>"
  },
  "timeline": {
    "issueDuration": "<extracted duration sa Tagalog o 'Hindi alam'>",
    "statuteOfLimitations": {
      "applicable": <boolean>,
      "deadline": "<ISO date string o null>",
      "daysRemaining": <number o null>,
      "warning": "<warning message sa Tagalog o null>"
    },
    "estimatedResolution": "<estimated timeline sa Tagalog>",
    "milestones": []
  },
  "relevantLaws": [
    {
      "title": "<law title>",
      "law": "<law citation>",
      "description": "<how it applies sa Tagalog>",
      "relevance": "high|medium|low"
    }
  ],
  "rights": [
    "<specific right 1 sa Tagalog>",
    "<specific right 2 sa Tagalog>",
    "<specific right 3 sa Tagalog>",
    "... (mas marami kung applicable)"
  ],
  "essentialDocuments": [
    "<document 1 needed sa Tagalog>",
    "<document 2 needed sa Tagalog>",
    "<document 3 needed sa Tagalog>",
    "... (mas marami kung applicable)"
  ],
  "nextSteps": [
    {
      "action": "<action item sa Tagalog>",
      "priority": "high|medium|low",
      "deadline": "<ISO date string o null>"
    }
  ],
  "estimatedCosts": {
    "consultationFee": "<estimated consultation fee range sa PHP, e.g., '₱3,000 - ₱5,000'>",
    "filingFees": "<estimated filing fees range sa PHP, e.g., '₱5,000 - ₱15,000'>",
    "totalEstimated": "<total estimated cost range sa PHP, e.g., '₱10,000 - ₱50,000'>",
    "paymentPlan": "<optional note about payment plans sa Tagalog kung available>",
    "additionalCosts": "<optional: iba pang gastos tulad ng notary fees, court fees, etc. sa Tagalog>",
    "costBreakdown": "<optional: detailed breakdown ng costs sa Tagalog>"
  },
  "governmentAgencies": [
    {
      "name": "<agency name>",
      "purpose": "<why to contact this agency sa Tagalog>",
      "contact": "<phone number o contact info>",
      "website": "<optional website URL>"
    }
  ]
}

IMPORTANT INSTRUCTIONS (LAHAT NG RESPONSE AY DAPAT NASA TAGALOG):
1. I-extract ang case type batay sa sitwasyong inilarawan
2. Suriin ang severity batay sa legal complexity, financial impact, at urgency
3. Tukuyin ang LAHAT ng kaugnay na batas ng Pilipinas mula sa provided list - isama ang lahat ng applicable (walang limit, maging comprehensive)
4. I-extract o infer ang duration ng issue mula sa description
5. Tukuyin kung applicable ang statute of limitations at kalkulahin ang deadlines kung applicable
6. Magbigay ng LAHAT ng specific, actionable na karapatan batay sa batas ng Pilipinas - isama ang lahat ng applicable (walang limit)
7. Listahin ang essential documents na kailangan para sa specific na kasong ito
8. Gumawa ng prioritized next steps na may deadlines kung applicable
9. Tantiyahin ang realistic costs batay sa Philippine legal fees (consultation fees typically ₱3,000-₱10,000, filing fees vary by case type). Isama ang detailed breakdown ng lahat ng potential costs.
10. Tukuyin ang relevant Philippine government agencies (e.g., DOJ, DSWD, DOLE, LRA, etc.) na makakatulong
11. Gamitin ang actual Philippine legal principles at i-cite ang specific laws kapag posible
12. Magbalik ng valid JSON LAMANG, walang additional text o markdown formatting
13. LAHAT NG TEKSTO SA RESPONSE AY DAPAT NASA TAGALOG/FILIPINO

Suriin ang kaso ngayon at ibalik ang JSON response:`;
}

function parseGeminiResponse(
  responseText: string,
  description: string
): CaseAnalysis {
  try {
    // Extract JSON from response (Gemini might wrap it in markdown code blocks)
    let jsonText = responseText.trim();

    // Remove markdown code blocks if present
    jsonText = jsonText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    // Try to extract JSON object if there's extra text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    const parsed = JSON.parse(jsonText);

    // Validate and map to CaseAnalysis structure
    const caseType = parsed.caseType || "Civil";
    const severityRating = parsed.severity?.rating || "medium";
    const complexity = parsed.severity?.complexity || 5;

    // Get relevant lawyers based on case type
    const relevantLawyers = LAWYERS.filter((lawyer) => {
      if (caseType === "Property") {
        return (
          lawyer.specialization.toLowerCase().includes("property") ||
          lawyer.specialization.toLowerCase().includes("real estate")
        );
      } else if (caseType === "Criminal") {
        return lawyer.specialization.toLowerCase().includes("criminal");
      } else if (caseType === "Labor") {
        return lawyer.specialization.toLowerCase().includes("labor");
      } else if (caseType === "Family Law") {
        return lawyer.specialization.toLowerCase().includes("family");
      }
      return true;
    }).slice(0, 3);

    // Map relevant laws - try to match with our database or use Gemini's suggestions
    // No limit - include all relevant laws
    const relevantLaws =
      parsed.relevantLaws?.map(
        (law: {
          title?: string;
          law?: string;
          description?: string;
          relevance?: string;
        }) => {
          // Try to find matching law in our database
          const matchingLaw = PHILIPPINE_LAWS.find(
            (l) =>
              l.title.toLowerCase().includes(law.title?.toLowerCase() || "") ||
              l.law.toLowerCase().includes(law.law?.toLowerCase() || "")
          );

          return (
            matchingLaw || {
              title: law.title || "Relevant Law",
              law: law.law || "Philippine Law",
              description: law.description || law.law || "",
              relevance:
                (law.relevance as "high" | "medium" | "low") || "medium",
            }
          );
        }
      ) || [];

    // Process timeline
    const issueDuration = parsed.timeline?.issueDuration || "Unknown";
    const statuteInfo = parsed.timeline?.statuteOfLimitations || {};
    const deadline = statuteInfo.deadline
      ? new Date(statuteInfo.deadline)
      : null;
    const daysRemaining = deadline
      ? Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;

    // Build milestones
    const milestones = [];
    if (deadline) {
      milestones.push({
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        event: "Paunang konsultasyon sa abogado",
        type: "milestone" as const,
      });
      milestones.push({
        date: deadline,
        event: "Deadline ng preskripsyon",
        type: "deadline" as const,
      });
    }

    return {
      caseType,
      severity: {
        rating: severityRating,
        complexity: Math.max(1, Math.min(10, complexity)),
        financialImpact:
          parsed.severity?.financialImpact ||
          (severityRating === "high"
            ? "Mataas - Maaaring may kasamang malaking halaga ng property o malubhang kahihinatnan"
            : severityRating === "medium"
            ? "Katamtaman - Maaaring may kasamang katamtamang financial o personal na epekto"
            : "Mababa - Relatibong menor na epekto ang inaasahan"),
        timeSensitivity:
          parsed.severity?.timeSensitivity ||
          (daysRemaining && daysRemaining < 60
            ? "Urgent - Malapit na ang statute of limitations"
            : "Katamtaman - Dapat kumilos sa loob ng makatwirang panahon"),
      },
      timeline: {
        issueDuration,
        statuteOfLimitations: {
          applicable: statuteInfo.applicable !== false,
          deadline,
          daysRemaining,
          warning:
            daysRemaining && daysRemaining < 60
              ? `Ang preskripsyon ay mag-e-expire sa ${daysRemaining} araw`
              : null,
        },
        estimatedResolution:
          parsed.timeline?.estimatedResolution ||
          (severityRating === "high"
            ? "6-12 buwan (maaaring mag-iba)"
            : severityRating === "medium"
            ? "3-6 buwan (maaaring mag-iba)"
            : "1-3 buwan (maaaring mag-iba)"),
        milestones,
      },
      relevantLaws,
      rights: parsed.rights || [
        "Mayroon kayong karapatan sa due process sa ilalim ng batas",
        "Mayroon kayong karapatan sa legal representation",
        "Mayroon kayong karapatan na magharap ng ebidensya para sa inyong pabor",
      ],
      lawyers: relevantLawyers,
      essentialDocuments: parsed.essentialDocuments || [
        "Lahat ng kaugnay na dokumento tungkol sa inyong kaso",
        "Valid identification",
        "Ebidensya na sumusuporta sa inyong claim",
      ],
      nextSteps: parsed.nextSteps || [
        {
          action:
            "Konsultahin ang isang kwalipikadong abogado na dalubhasa sa inyong uri ng kaso sa lalong madaling panahon",
          priority: "high" as const,
          deadline: deadline ? deadline.toISOString() : null,
        },
        {
          action:
            "Tipunin at ayusin ang lahat ng mahahalagang dokumento tungkol sa inyong kaso",
          priority: "high" as const,
          deadline: null,
        },
      ],
      estimatedCosts: parsed.estimatedCosts || undefined,
      governmentAgencies: parsed.governmentAgencies || undefined,
    };
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    // Fallback to mock analysis if parsing fails
    return fallbackAnalysis(description);
  }
}

function fallbackAnalysis(description: string): CaseAnalysis {
  // Fallback to simplified analysis if Gemini parsing fails
  const lowerDescription = description.toLowerCase();
  let caseType = "Civil";
  if (
    lowerDescription.includes("farm") ||
    lowerDescription.includes("land") ||
    lowerDescription.includes("property")
  ) {
    caseType = "Property";
  } else if (
    lowerDescription.includes("rape") ||
    lowerDescription.includes("crime") ||
    lowerDescription.includes("criminal")
  ) {
    caseType = "Criminal";
  } else if (
    lowerDescription.includes("labor") ||
    lowerDescription.includes("employee") ||
    lowerDescription.includes("work")
  ) {
    caseType = "Labor";
  }

  const relevantLawyers = LAWYERS.filter((lawyer) => {
    if (caseType === "Property") {
      return (
        lawyer.specialization.toLowerCase().includes("property") ||
        lawyer.specialization.toLowerCase().includes("real estate")
      );
    }
    return true;
  }).slice(0, 3);

  return {
    caseType,
    severity: {
      rating: "medium",
      complexity: 5,
      financialImpact:
        "Katamtaman - Maaaring may kasamang katamtamang financial o personal na epekto",
      timeSensitivity:
        "Katamtaman - Dapat kumilos sa loob ng makatwirang panahon",
    },
    timeline: {
      issueDuration: "Hindi alam",
      statuteOfLimitations: {
        applicable: true,
        deadline: null,
        daysRemaining: null,
        warning: null,
      },
      estimatedResolution: "3-6 buwan (maaaring mag-iba)",
      milestones: [],
    },
    relevantLaws: [],
    rights: [
      "Mayroon kayong karapatan sa due process sa ilalim ng batas",
      "Mayroon kayong karapatan sa legal representation",
      "Mayroon kayong karapatan na magharap ng ebidensya para sa inyong pabor",
    ],
    lawyers: relevantLawyers,
    essentialDocuments: [
      "Lahat ng kaugnay na dokumento tungkol sa inyong kaso",
      "Valid identification",
      "Ebidensya na sumusuporta sa inyong claim",
    ],
    nextSteps: [
      {
        action:
          "Konsultahin ang isang kwalipikadong abogado na dalubhasa sa inyong uri ng kaso",
        priority: "high" as const,
        deadline: null,
      },
    ],
    estimatedCosts: {
      consultationFee: "₱3,000 - ₱5,000",
      filingFees: "₱5,000 - ₱15,000",
      totalEstimated: "₱10,000 - ₱50,000",
      paymentPlan: "Karamihan ng mga abogado ay nag-aalok ng payment plan",
      additionalCosts:
        "Maaaring may iba pang gastos tulad ng notary fees, courier fees, at iba pa",
      costBreakdown:
        "Konsultasyon: ₱3,000-₱5,000 | Filing fees: ₱5,000-₱15,000 | Iba pang gastos: ₱2,000-₱10,000",
    },
    governmentAgencies: [],
  };
}
