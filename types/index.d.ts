interface Feedback {
  id: string;
  interviewId: string;
  userId: string;
  score: number;
  strengths?: string[];
  constraints?: string[];
  improvement?: string[];
  finalAssessment: string;
  createdAt: string;
}

interface Interview {
  id: string;
  type: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  amount: string;
  createdAt: string;
  userId: string;
  finished: boolean;
  feedbackId: string;
  icon?: string;
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface UserInfor {
  name: string;
  email: string;
  id: string;
}

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

interface AgentProps {
  user: any;
  interviewId: string;
  feedbackId?: string;
  questions?: string[];
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}


interface InterviewInfor {
    type: string;
    role: string;
    level: string;
    techstack: string;
    amount: string;
    cv: File | null;
}

interface SavedMessage {
    role: 'user' | 'system' | 'assistant';
    content: string;
}

interface FeedbackInputProps {
    transcript:SavedMessage[],
    userId:string,
    interviewId:string
}

type InterviewPageProps = {
    params: { id: string };
};

interface UpdateObject {
    type?: string;
    role?: string;
    level?: string;
    questions?: string[];
    techstack?: string[];
    amount?: string;
    createdAt?: string;
    userId?: string;
    finished?: boolean;
    feedbackId?: string;
}
