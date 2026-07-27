/**
 * LeetCode Service
 *
 * Fetches all profile data from the LeetCode GraphQL API.
 * Username: U1dRE5dhPW
 */

import { siteConfig } from "@/config/site";
import type { LeetCodeData, LeetCodeDifficulty } from "@/types/leetcode";

const ENDPOINT = "https://leetcode.com/graphql";
const USERNAME = siteConfig.leetcode.username;

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
      Origin: "https://leetcode.com",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: siteConfig.revalidate.leetcode },
  });

  if (!res.ok) throw new Error(`LeetCode API failed: ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data as T;
}

// ─── Submission Heatmap ───────────────────────────────────────

export interface SubmissionDay {
  date: string;          // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function parseSubmissionCalendar(raw: string): SubmissionDay[] {
  try {
    const parsed: Record<string, number> = JSON.parse(raw);
    return Object.entries(parsed).map(([ts, count]) => {
      const date = new Date(parseInt(ts) * 1000);
      const dateStr = date.toISOString().slice(0, 10);
      const level: 0 | 1 | 2 | 3 | 4 =
        count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 10 ? 3 : 4;
      return { date: dateStr, count, level };
    });
  } catch {
    return [];
  }
}

// ─── Main Query ───────────────────────────────────────────────

const MAIN_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
        starRating
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      badges {
        id
        name
        icon
        creationDate
      }
      userCalendar(year: ${new Date().getFullYear()}) {
        streak
        totalActiveDays
        submissionCalendar
      }
      activeBadge {
        id
        name
        icon
        creationDate
      }
    }
    recentSubmissionList(username: $username, limit: 8) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
      totalParticipants
    }
    userContestRankingHistory(username: $username) {
      attended
      trendDirection
      problemsSolved
      totalProblems
      finishTimeInSeconds
      rating
      ranking
      contest {
        title
        startTime
      }
    }
  }
`;

// ─── Build Full LeetCode Data ─────────────────────────────────

interface RawSubmitStat {
  difficulty: string;
  count: number;
  submissions: number;
}

interface RawContestHistory {
  attended: boolean;
  trendDirection: "UP" | "DOWN" | "NONE";
  problemsSolved: number;
  totalProblems: number;
  finishTimeInSeconds: number;
  rating: number;
  ranking: number;
  contest: { title: string; startTime: number };
}

interface RawBadge {
  id: string;
  name: string;
  icon: string;
  creationDate: string;
}

interface RawSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

interface RawData {
  matchedUser: {
    username: string;
    profile: { ranking: number };
    submitStats: { acSubmissionNum: RawSubmitStat[] };
    badges: RawBadge[];
    userCalendar: { streak: number; totalActiveDays: number; submissionCalendar: string };
  };
  recentSubmissionList: RawSubmission[];
  userContestRanking: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    topPercentage: number;
  } | null;
  userContestRankingHistory: RawContestHistory[];
}

export async function buildLeetCodeData(): Promise<LeetCodeData> {
  const raw = await gql<RawData>(MAIN_QUERY, { username: USERNAME });

  const user = raw.matchedUser;
  const contest = raw.userContestRanking;
  const history = raw.userContestRankingHistory ?? [];

  const stats = user.submitStats?.acSubmissionNum ?? [];

  const totalSolved = stats.find((s) => s.difficulty === "All")?.count ?? 0;
  const totalQuestions = stats.find((s) => s.difficulty === "All")?.submissions ?? 0;

  const difficulties: LeetCodeDifficulty[] = (["Easy", "Medium", "Hard"] as const).map(
    (d) => {
      const stat = stats.find((s) => s.difficulty === d);
      return { difficulty: d, count: stat?.count ?? 0, total: stat?.submissions ?? 0 };
    }
  );

  const submissionDays = parseSubmissionCalendar(
    user.userCalendar?.submissionCalendar ?? "{}"
  );

  return {
    username: user.username,
    totalSolved,
    totalQuestions,
    ranking: user.profile?.ranking ?? 0,
    acceptanceRate:
      totalQuestions > 0 ? Math.round((totalSolved / totalQuestions) * 100) : 0,
    streak: user.userCalendar?.streak ?? 0,
    maxStreak: user.userCalendar?.streak ?? 0,
    contestRating: Math.round(contest?.rating ?? 0),
    contestGlobalRanking: contest?.globalRanking ?? 0,
    difficulties,
    badges: (user.badges ?? []).slice(0, 8),
    recentSubmissions: raw.recentSubmissionList ?? [],
    contestHistory: history.filter((h) => h.attended).slice(0, 10),
    submissionDays,
  };
}

