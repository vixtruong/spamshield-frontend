export interface Email {
  emailId: number;
  sender: string;
  subject: string | null;
  content: string | null;
  emailDate: string;
  label: string | null;
  createdAt: string | null;
}