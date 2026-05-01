export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  totalScore: number;
  completedTasks: string[];
  currentTrackId: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export interface TaskStep {
  title: string;
  content: string;
}

export interface TaskTip {
  title: string;
  content: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  trackId: string;
  initialCode: string;
  instructions: TaskStep[];
  objectives?: string[]; // Core objectives for evaluation
  basics?: TaskStep[]; // Educational content
  tips?: TaskTip[];    // Task-specific tips
  visualState?: 'idle' | 'running' | 'success' | 'error';
  // Real-world email/ticket fields
  sender?: {
    name: string;
    role: string;
    avatar?: string;
  };
  subject?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  visualType?: 'architecture' | 'logic' | 'memory' | 'system';
}

export interface InterviewProbe {
  id: string;
  question: string;
  type: 'text' | 'code';
  expectedFocus?: string[];
}

export interface Interview {
  id: string;
  title: string;
  company: string;
  role: string;
  difficulty: 'junior' | 'mid' | 'senior';
  interviewer: {
    name: string;
    role: string;
    avatar: string;
    personality: string;
  };
  probes: InterviewProbe[];
  trackId: string;
}

export interface InterviewAttempt {
  id: string;
  userId: string;
  interviewId: string;
  history: {
    probeId: string;
    answer: string;
    feedback?: string;
    score?: number;
  }[];
  finalScore: number;
  completedAt: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tasks: string[];
}
