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

  return `You are a legal expert specializing in Philippine law. Analyze the following legal situation and provide a comprehensive analysis.

USER'S SITUATION:
${description}

AVAILABLE PHILIPPINE LAWS FOR REFERENCE:
${lawsContext}

Please analyze this case and provide a JSON response with the following structure:
{
  "caseType": "Property|Criminal|Labor|Family Law|Civil|Administrative|Tax|Corporate",
  "severity": {
    "rating": "low|medium|high",
    "complexity": <number 1-10>,
    "financialImpact": "<detailed description>",
    "timeSensitivity": "<detailed description>"
  },
  "timeline": {
    "issueDuration": "<extracted duration or 'Unknown'>",
    "statuteOfLimitations": {
      "applicable": <boolean>,
      "deadline": "<ISO date string or null>",
      "daysRemaining": <number or null>,
      "warning": "<warning message or null>"
    },
    "estimatedResolution": "<estimated timeline>",
    "milestones": []
  },
  "relevantLaws": [
    {
      "title": "<law title>",
      "law": "<law citation>",
      "description": "<how it applies>",
      "relevance": "high|medium|low"
    }
  ],
  "rights": [
    "<specific right 1>",
    "<specific right 2>",
    "<specific right 3>"
  ],
  "essentialDocuments": [
    "<document 1 needed>",
    "<document 2 needed>",
    "<document 3 needed>"
  ],
  "nextSteps": [
    {
      "action": "<action item>",
      "priority": "high|medium|low",
      "deadline": "<ISO date string or null>"
    }
  ],
  "estimatedCosts": {
    "consultationFee": "<estimated consultation fee range in PHP, e.g., '₱3,000 - ₱5,000'>",
    "filingFees": "<estimated filing fees range in PHP, e.g., '₱5,000 - ₱15,000'>",
    "totalEstimated": "<total estimated cost range in PHP, e.g., '₱10,000 - ₱50,000'>",
    "paymentPlan": "<optional note about payment plans if available>"
  },
  "riskAssessment": {
    "inactionRisks": [
      "<risk 1 of not taking action>",
      "<risk 2 of not taking action>",
      "<risk 3 of not taking action>"
    ],
    "actionBenefits": [
      "<benefit 1 of taking action>",
      "<benefit 2 of taking action>",
      "<benefit 3 of taking action>"
    ],
    "urgencyLevel": "low|medium|high"
  },
  "governmentAgencies": [
    {
      "name": "<agency name>",
      "purpose": "<why to contact this agency>",
      "contact": "<phone number or contact info>",
      "website": "<optional website URL>"
    }
  ],
  "evidenceGuide": [
    {
      "item": "<evidence item name>",
      "description": "<what it is and why it's needed>",
      "importance": "critical|important|helpful"
    }
  ]
}

IMPORTANT INSTRUCTIONS:
1. Extract the case type based on the situation described
2. Assess severity based on legal complexity, financial impact, and urgency
3. Identify relevant Philippine laws from the provided list (max 3-4 most relevant)
4. Extract or infer the duration of the issue from the description
5. Determine if statute of limitations applies and calculate deadlines if applicable
6. Provide specific, actionable rights based on Philippine law
7. List essential documents needed for this specific case
8. Create prioritized next steps with deadlines if applicable
9. Estimate realistic costs based on Philippine legal fees (consultation fees typically ₱3,000-₱10,000, filing fees vary by case type)
10. Assess risks of inaction vs benefits of taking action - be realistic and practical
11. Identify relevant Philippine government agencies (e.g., DOJ, DSWD, DOLE, LRA, etc.) that can help
12. Provide evidence collection guide with items prioritized by importance (critical items are must-haves, helpful items strengthen the case)
13. Use actual Philippine legal principles and cite specific laws when possible
14. Return ONLY valid JSON, no additional text or markdown formatting

Analyze the case now and return the JSON response:`;
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
    const relevantLaws =
      parsed.relevantLaws
        ?.slice(0, 3)
        .map(
          (law: {
            title?: string;
            law?: string;
            description?: string;
            relevance?: string;
          }) => {
            // Try to find matching law in our database
            const matchingLaw = PHILIPPINE_LAWS.find(
              (l) =>
                l.title
                  .toLowerCase()
                  .includes(law.title?.toLowerCase() || "") ||
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
        ) || PHILIPPINE_LAWS.slice(0, 3);

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
        event: "Initial consultation with lawyer",
        type: "milestone" as const,
      });
      milestones.push({
        date: deadline,
        event: "Statute of limitations deadline",
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
            ? "High - May involve significant property value or serious consequences"
            : severityRating === "medium"
            ? "Moderate - May involve moderate financial or personal impact"
            : "Low - Relatively minor impact expected"),
        timeSensitivity:
          parsed.severity?.timeSensitivity ||
          (daysRemaining && daysRemaining < 60
            ? "Urgent - Statute of limitations approaching"
            : "Moderate - Action should be taken within reasonable time"),
      },
      timeline: {
        issueDuration,
        statuteOfLimitations: {
          applicable: statuteInfo.applicable !== false,
          deadline,
          daysRemaining,
          warning:
            daysRemaining && daysRemaining < 60
              ? `Statute of limitations expires in ${daysRemaining} days`
              : null,
        },
        estimatedResolution:
          parsed.timeline?.estimatedResolution ||
          (severityRating === "high"
            ? "6-12 months (may vary)"
            : severityRating === "medium"
            ? "3-6 months (may vary)"
            : "1-3 months (may vary)"),
        milestones,
      },
      relevantLaws,
      rights: parsed.rights || [
        "You have the right to due process under the law",
        "You have the right to legal representation",
        "You have the right to present evidence in your favor",
      ],
      lawyers: relevantLawyers,
      essentialDocuments: parsed.essentialDocuments || [
        "All relevant documents related to your case",
        "Valid identification",
        "Evidence supporting your claim",
      ],
      nextSteps: parsed.nextSteps || [
        {
          action:
            "Consult with a qualified lawyer specializing in your case type as soon as possible",
          priority: "high" as const,
          deadline: deadline ? deadline.toISOString() : null,
        },
        {
          action:
            "Gather and organize all essential documents related to your case",
          priority: "high" as const,
          deadline: null,
        },
      ],
      estimatedCosts: parsed.estimatedCosts || undefined,
      riskAssessment: parsed.riskAssessment || undefined,
      governmentAgencies: parsed.governmentAgencies || undefined,
      evidenceGuide: parsed.evidenceGuide || undefined,
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
        "Moderate - May involve moderate financial or personal impact",
      timeSensitivity:
        "Moderate - Action should be taken within reasonable time",
    },
    timeline: {
      issueDuration: "Unknown",
      statuteOfLimitations: {
        applicable: true,
        deadline: null,
        daysRemaining: null,
        warning: null,
      },
      estimatedResolution: "3-6 months (may vary)",
      milestones: [],
    },
    relevantLaws: PHILIPPINE_LAWS.slice(0, 3),
    rights: [
      "You have the right to due process under the law",
      "You have the right to legal representation",
      "You have the right to present evidence in your favor",
    ],
    lawyers: relevantLawyers,
    essentialDocuments: [
      "All relevant documents related to your case",
      "Valid identification",
      "Evidence supporting your claim",
    ],
    nextSteps: [
      {
        action:
          "Consult with a qualified lawyer specializing in your case type",
        priority: "high" as const,
        deadline: null,
      },
    ],
    estimatedCosts: {
      consultationFee: "₱3,000 - ₱5,000",
      filingFees: "₱5,000 - ₱15,000",
      totalEstimated: "₱10,000 - ₱50,000",
      paymentPlan: "Most lawyers offer payment plans",
    },
    riskAssessment: {
      inactionRisks: [
        "Legal situation may worsen without timely action",
        "May lose important legal rights or opportunities",
        "Could face additional penalties or consequences",
      ],
      actionBenefits: [
        "Protect your legal rights and interests",
        "Get professional guidance on your case",
        "Improve chances of favorable outcome",
      ],
      urgencyLevel: "medium" as const,
    },
    governmentAgencies: [],
    evidenceGuide: [],
  };
}
