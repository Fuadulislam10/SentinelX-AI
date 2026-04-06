
export enum Severity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum Confidence {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface EducationalContent {
  concept: string;
  analogy: string;
  secureByDesignPrinciple: string;
  commonMistake: string;
}

export interface SecurityFinding {
  name: string;
  severity: Severity;
  confidence: Confidence;
  description: string;
  impact: string;
  exploitationConcept: string;
  remediation: string;
  owaspReference: string;
  educationalContent?: EducationalContent;
}

export interface RiskCorrelation {
  findings: string[];
  outcome: string;
  explanation: string;
}

export interface RiskReasoning {
  engineSummary: string;
  correlations: RiskCorrelation[];
}

export interface ThreatScenario {
  title: string;
  riskFlow: string;
  connectedFindings: string[];
}

export interface ArchitectureComponent {
  name: string;
  type: 'Frontend' | 'Backend' | 'Database' | 'Infrastructure' | 'Unknown';
  indicators: string[];
}

export interface DiscoveredAsset {
  path: string;
  type: 'Page' | 'Endpoint' | 'Configuration' | 'Resource';
  riskNote: string;
}

export interface AttackSurfaceMap {
  assets: DiscoveredAsset[];
  discoverySummary: string;
  defensiveStrategy: string;
}

export interface SHA512AnalysisReport {
  implementationConfidence: number;
  hashingStrategy: string;
  collisionResistance: string;
  recommendations: string[];
  technicalDeepDive: string;
}

export interface QuantumReadiness {
  status: 'Vulnerable' | 'Resilient' | 'Partial';
  score: number;
  postQuantumAlgorithmStatus: string;
  mitigationStrategy: string;
  technicalDetails: string;
}

export interface InfrastructureInsight {
  ipReputation: string;
  hostingType: string;
  geolocationRisk: string;
  networkTopologyNote: string;
}

export interface ScanResult {
  target: string;
  resolvedIp?: string;
  overallRiskScore: number;
  summary: {
    low: number;
    medium: number;
    high: number;
  };
  findings: SecurityFinding[];
  riskReasoning: RiskReasoning;
  architecture: {
    components: ArchitectureComponent[];
    attackSurface: string[];
  };
  attackSurfaceMap: AttackSurfaceMap;
  sha512Analysis: SHA512AnalysisReport;
  quantumReadiness: QuantumReadiness;
  infrastructure: InfrastructureInsight;
  threatModel: {
    scenarios: ThreatScenario[];
    primaryThreatActors: string[];
  };
  humanSummary: string;
  learningInsight: string;
  sentinelXInsight: string;
  remediationRoadmap: string[];
}

export interface CustomModules {
  cookieAnalysis: boolean;
  headerAnalysis: boolean;
  integrityAnalysis: boolean;
  attackSurfaceMapping: boolean;
  infrastructureAnalysis: boolean;
  quantumReadiness: boolean;
}

export interface ScanOptions {
  url: string;
  targetIp?: string;
  depth: 'low' | 'medium' | 'high';
  shaAnalysisDepth: 'standard' | 'deep' | 'forensic';
  learningMode: boolean;
  customModules: CustomModules;
}

export interface ChatMessage {
  role: 'user' | 'mentor';
  text: string;
  timestamp: Date;
  audioData?: string;
}
