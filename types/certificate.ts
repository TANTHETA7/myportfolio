export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  category: "ai-ml" | "cloud" | "programming" | "hardware" | "other";
  featured?: boolean;
}
