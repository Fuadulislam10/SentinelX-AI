
import { GoogleGenAI, Type, Chat, Modality } from "@google/genai";
import { ScanResult, ScanOptions, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const performSecurityScan = async (options: ScanOptions): Promise<ScanResult> => {
  const { url, targetIp, depth, shaAnalysisDepth, learningMode, customModules } = options;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the security posture and architecture of: ${url}. 
               Target IP Context: ${targetIp || 'Resolve passively'}.
               Scan Depth: ${depth}. 
               SHA512 Analysis Intensity: ${shaAnalysisDepth}.
               
               Act as a Senior Security Architect and Educator. 
               
               ${learningMode ? `LEARNING MODE ENABLED: For EVERY finding, you MUST provide a comprehensive 'educationalContent' block. 
               Focus heavily on 'Secure-by-Design' principles (architectural prevention) and 'Common Developer Mistakes' (root cause analysis).` : ''}

               CUSTOM ANALYSIS SCOPE:
               - Cookie Security Analysis: ${customModules.cookieAnalysis ? 'ENABLED' : 'DISABLED'}
               - HTTP Header Security Analysis: ${customModules.headerAnalysis ? 'ENABLED' : 'DISABLED'}
               - Resource Integrity Analysis: ${customModules.integrityAnalysis ? 'ENABLED' : 'DISABLED'}
               - Attack Surface Mapping: ${customModules.attackSurfaceMapping ? 'ENABLED' : 'DISABLED'}
               - Infrastructure Analysis: ${customModules.infrastructureAnalysis ? 'ENABLED' : 'DISABLED'}
               - Quantum-Safe Readiness: ${customModules.quantumReadiness ? 'ENABLED' : 'DISABLED'}

               Perform:
               1. Passive Security Audit (Headers, Fingerprints, SRI).
               2. Risk Reasoning (Chained vulnerability logic).
               3. Attack Surface Mapping (Enumerate assets).
               4. Integrity Analysis (${shaAnalysisDepth}).
               5. Quantum Readiness Analysis (Analyze for post-quantum crypto resilience).
               6. Infrastructure Analysis (${targetIp}).
               7. Prioritized Remediation.

               No exploitation payloads. Focus on defensive engineering.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          target: { type: Type.STRING },
          resolvedIp: { type: Type.STRING },
          overallRiskScore: { type: Type.NUMBER },
          summary: {
            type: Type.OBJECT,
            properties: {
              low: { type: Type.NUMBER },
              medium: { type: Type.NUMBER },
              high: { type: Type.NUMBER }
            },
            required: ['low', 'medium', 'high']
          },
          findings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                severity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                confidence: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                description: { type: Type.STRING },
                impact: { type: Type.STRING },
                exploitationConcept: { type: Type.STRING },
                remediation: { type: Type.STRING },
                owaspReference: { type: Type.STRING },
                educationalContent: {
                  type: Type.OBJECT,
                  properties: {
                    concept: { type: Type.STRING, description: "Technical explanation of the underlying security mechanism." },
                    analogy: { type: Type.STRING, description: "A simple real-world analogy to help explain the risk." },
                    secureByDesignPrinciple: { type: Type.STRING, description: "The architectural principle that prevents this class of vulnerability." },
                    commonMistake: { type: Type.STRING, description: "The typical developer error that leads to this vulnerability." }
                  },
                  required: ['concept', 'analogy', 'secureByDesignPrinciple', 'commonMistake']
                }
              },
              required: ['name', 'severity', 'confidence', 'description', 'impact', 'exploitationConcept', 'remediation', 'owaspReference', 'educationalContent']
            }
          },
          riskReasoning: {
            type: Type.OBJECT,
            properties: {
              engineSummary: { type: Type.STRING },
              correlations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    findings: { type: Type.ARRAY, items: { type: Type.STRING } },
                    outcome: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  }
                }
              }
            },
            required: ['engineSummary', 'correlations']
          },
          sha512Analysis: {
            type: Type.OBJECT,
            properties: {
              implementationConfidence: { type: Type.NUMBER },
              hashingStrategy: { type: Type.STRING },
              collisionResistance: { type: Type.STRING },
              technicalDeepDive: { type: Type.STRING },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['implementationConfidence', 'hashingStrategy', 'collisionResistance', 'technicalDeepDive', 'recommendations']
          },
          quantumReadiness: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING, enum: ['Vulnerable', 'Resilient', 'Partial'] },
              score: { type: Type.NUMBER },
              postQuantumAlgorithmStatus: { type: Type.STRING },
              mitigationStrategy: { type: Type.STRING },
              technicalDetails: { type: Type.STRING }
            },
            required: ['status', 'score', 'postQuantumAlgorithmStatus', 'mitigationStrategy', 'technicalDetails']
          },
          infrastructure: {
            type: Type.OBJECT,
            properties: {
              ipReputation: { type: Type.STRING },
              hostingType: { type: Type.STRING },
              geolocationRisk: { type: Type.STRING },
              networkTopologyNote: { type: Type.STRING }
            },
            required: ['ipReputation', 'hostingType', 'geolocationRisk', 'networkTopologyNote']
          },
          attackSurfaceMap: {
            type: Type.OBJECT,
            properties: {
              assets: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    path: { type: Type.STRING },
                    type: { type: Type.STRING },
                    riskNote: { type: Type.STRING }
                  }
                }
              },
              discoverySummary: { type: Type.STRING },
              defensiveStrategy: { type: Type.STRING }
            },
            required: ['assets', 'discoverySummary', 'defensiveStrategy']
          },
          architecture: {
            type: Type.OBJECT,
            properties: {
              components: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    type: { type: Type.STRING },
                    indicators: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              },
              attackSurface: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['components', 'attackSurface']
          },
          threatModel: {
            type: Type.OBJECT,
            properties: {
              scenarios: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    riskFlow: { type: Type.STRING },
                    connectedFindings: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              },
              primaryThreatActors: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['scenarios', 'primaryThreatActors']
          },
          humanSummary: { type: Type.STRING },
          learningInsight: { type: Type.STRING },
          sentinelXInsight: { type: Type.STRING },
          remediationRoadmap: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: [
          'target', 'overallRiskScore', 'summary', 'findings', 'riskReasoning', 
          'sha512Analysis', 'quantumReadiness', 'infrastructure', 'attackSurfaceMap',
          'architecture', 'threatModel', 'humanSummary', 
          'learningInsight', 'sentinelXInsight', 'remediationRoadmap'
        ]
      }
    }
  });

  try {
    return JSON.parse(response.text) as ScanResult;
  } catch (error) {
    throw new Error("Critical Analysis Error: Neural parsing failed. The target architecture may be obfuscated.");
  }
};

let activeMentorChat: Chat | null = null;

export const getMentorResponse = async (question: string, context: ScanResult): Promise<string> => {
  if (!activeMentorChat) {
    activeMentorChat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the SentinelX Mentor AI, a world-class cybersecurity instructor. 
        You are currently reviewing a security scan for ${context.target}.
        Overall Risk Score: ${context.overallRiskScore}/100.
        Key findings include: ${context.findings.slice(0, 3).map(f => f.name).join(', ')}.
        
        YOUR ROLE:
        1. Explain complex security concepts using simple analogies.
        2. Focus on "Secure-by-Design" principles and defensive engineering.
        3. Never provide exploit code, payloads, or hacking instructions.
        4. Be supportive and professional. If a user asks for an attack, redirect them to the defensive fix.
        5. Use the specific context of the current scan to make your answers relevant.`,
      }
    });
  }

  const response = await activeMentorChat.sendMessage({ message: question });
  return response.text || "I'm sorry, I couldn't process that. Let's refocus on the security findings.";
};

export const generateSpeech = async (text: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Speak this security insight professionally: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Charon' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("Speech generation failed", error);
    return undefined;
  }
};

export const resetMentorChat = () => {
  activeMentorChat = null;
};
