export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
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
  visualType?: 'architecture' | 'logic' | 'memory';
}

export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tasks: string[];
}
