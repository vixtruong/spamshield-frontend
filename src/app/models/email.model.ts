export interface Email {
  emailId: number;
  sender: string;
  subject: string | null;
  content: string | null;
  label: string | null;
  emailDate: string;
  createdAt: string | null;
}

export interface EmailDetail {
  emailId: number;
  sender: string;
  subject: string | null;
  content: string | null;
  label: string | null;
  emailDate: string;
  createdAt: string | null;
  emailExplanations: EmailExplanation[];
}

export interface EmailExplanation {
  explanationId: number;
  emailId: number;
  predictedLabel: string;
  probabilities: { ham: number; spam: number };
  keyWords: KeyWord[];
  explanationMessage: string | null;
  createdAt: string | null;
}

export interface KeyWord {
  word: string;
  tfidf_score: number;
  spam_contribution: number;
  ham_contribution: number;
}