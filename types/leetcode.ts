export interface LeetCodeSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

export interface LeetCodeBadge {
  id: string;
  name: string;
  icon: string;
  creationDate: string;
}

export interface LeetCodeDifficulty {
  difficulty: "Easy" | "Medium" | "Hard";
  count: number;
  total: number;
}

export interface LeetCodeContestHistory {
  attended: boolean;
  trendDirection: "UP" | "DOWN" | "NONE";
  problemsSolved: number;
  totalProblems: number;
  finishTimeInSeconds: number;
  rating: number;
  ranking: number;
  contest: {
    title: string;
    startTime: number;
  };
}

export interface LeetCodeSubmissionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface LeetCodeData {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  ranking: number;
  acceptanceRate: number;
  streak: number;
  maxStreak: number;
  contestRating: number;
  contestGlobalRanking: number;
  difficulties: LeetCodeDifficulty[];
  badges: LeetCodeBadge[];
  recentSubmissions: LeetCodeSubmission[];
  contestHistory: LeetCodeContestHistory[];
  submissionDays?: LeetCodeSubmissionDay[];
}
