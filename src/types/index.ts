export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  questions: Question[];
  currentQuestion: number;
  timeRemaining: number;
  isComplete: boolean;
}

export interface Answer {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
  timeSpent: number;
  bonusPoints: number;
}

export interface QuizAttempt {
  id: string;
  username: string;
  answers: Answer[];
  score: number;
  bonusPoints: number;
  totalScore: number;
  completedAt: Date;
  timeSpent: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  bonusPoints: number;
  totalScore: number;
  percentage: number;
  date: string;
}

export interface User {
  username: string;
  scores: number[];
  attempts: QuizAttempt[];
}

export type TimerState = 'safe' | 'warning' | 'critical' | 'expired';

export type QuestionCategory = 'General Knowledge' | 'Science & Technology' | 'History' | 'Geography';
export type RootStackParamList = {
  Welcome: undefined;
  Username: undefined;
  Quiz: { quiz: Quiz };
  Results: { attempt: QuizAttempt };
  Leaderboard: undefined;
};
