import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LeaderboardEntry, QuizAttempt } from '../types';
import { STORAGE_KEYS, QUIZ_CONFIG } from '../utils/constants';

interface LeaderboardState {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  addEntry: (attempt: QuizAttempt) => void;
  getTopEntries: (count?: number) => LeaderboardEntry[];
  getUserRank: (username: string) => number;
  clearLeaderboard: () => void;
  getTotalEntries: () => number;
  getAverageScore: () => number;
  getHighestScore: () => number;
}

const MAX_LEADERBOARD_ENTRIES = 100;
const MOCK_LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "สมเจต",
    score: 15,
    bonusPoints: 10,
    totalScore: 25,
    percentage: 75,
    date: "2024-01-20"
  },
  {
    rank: 2,
    username: "วิชญา",
    score: 14,
    bonusPoints: 9,
    totalScore: 23,
    percentage: 70,
    date: "2024-01-19"
  },
  {
    rank: 3,
    username: "นันท์นภัส",
    score: 13,
    bonusPoints: 8,
    totalScore: 21,
    percentage: 65,
    date: "2024-01-18"
  },
  {
    rank: 4,
    username: "ชาญวิทย์",
    score: 13,
    bonusPoints: 7,
    totalScore: 20,
    percentage: 65,
    date: "2024-01-17"
  },
  {
    rank: 5,
    username: "ปัญญาดา",
    score: 12,
    bonusPoints: 6,
    totalScore: 18,
    percentage: 60,
    date: "2024-01-16"
  },
  {
    rank: 6,
    username: "อารีย์",
    score: 11,
    bonusPoints: 5,
    totalScore: 16,
    percentage: 55,
    date: "2024-01-15"
  },
  {
    rank: 7,
    username: "กิตติศักดิ์",
    score: 11,
    bonusPoints: 4,
    totalScore: 15,
    percentage: 55,
    date: "2024-01-14"
  },
  {
    rank: 8,
    username: "ธนกร",
    score: 10,
    bonusPoints: 3,
    totalScore: 13,
    percentage: 50,
    date: "2024-01-13"
  },
  {
    rank: 9,
    username: "ชญานิศ",
    score: 9,
    bonusPoints: 2,
    totalScore: 11,
    percentage: 45,
    date: "2024-01-12"
  },
  {
    rank: 10,
    username: "ธีรยุทธ",
    score: 8,
    bonusPoints: 1,
    totalScore: 9,
    percentage: 40,
    date: "2024-01-11"
  },
  {
    rank: 11,
    username: "สิรินทร์",
    score: 7,
    bonusPoints: 0,
    totalScore: 7,
    percentage: 35,
    date: "2024-01-10"
  },
  {
    rank: 12,
    username: "วีรยุทธ",
    score: 6,
    bonusPoints: 0,
    totalScore: 6,
    percentage: 30,
    date: "2024-01-09"
  },
  {
    rank: 13,
    username: "ชาติชาย",
    score: 5,
    bonusPoints: 0,
    totalScore: 5,
    percentage: 25,
    date: "2024-01-08"
  },
  {
    rank: 14,
    username: "นิรมล",
    score: 4,
    bonusPoints: 0,
    totalScore: 4,
    percentage: 20,
    date: "2024-01-07"
  },
  {
    rank: 15,
    username: "สุภาพร",
    score: 3,
    bonusPoints: 0,
    totalScore: 3,
    percentage: 15,
    date: "2024-01-06"
  }
];

export const useLeaderboardStore = create<LeaderboardState>()(
  persist(
    (set, get) => ({
      entries: MOCK_LEADERBOARD_DATA,
      isLoading: false,
      addEntry: (attempt: QuizAttempt) => {
        set({ isLoading: true });
        
        const newEntry: LeaderboardEntry = {
          rank: 0,
          username: attempt.username,
          score: attempt.score,
          bonusPoints: attempt.bonusPoints,
          totalScore: attempt.totalScore,
          percentage: Math.round((attempt.score / QUIZ_CONFIG.TOTAL_QUESTIONS) * 100),
          date: attempt.completedAt.toISOString().split('T')[0],
        };
        
        set(state => {
          const allEntries = [...state.entries, newEntry]
            .sort((a, b) => {
              if (b.totalScore !== a.totalScore) {
                return b.totalScore - a.totalScore;
              }
              if (b.score !== a.score) {
                return b.score - a.score;
              }
              return a.username.localeCompare(b.username);
            })
            .slice(0, MAX_LEADERBOARD_ENTRIES)
            .map((entry, index) => ({
              ...entry,
              rank: index + 1,
            }));
          
          return {
            entries: allEntries,
            isLoading: false,
          };
        });
      },
      
      getTopEntries: (count = 10) => {
        const state = get();
        return state.entries.slice(0, count);
      },
      
      getUserRank: (username: string) => {
        const state = get();
        const userEntry = state.entries.find(entry => 
          entry.username.toLowerCase() === username.toLowerCase()
        );
        return userEntry?.rank || 0;
      },
      
      clearLeaderboard: () => {
        set({
          entries: [],
          isLoading: false,
        });
      },
      getTotalEntries: () => {
        const state = get();
        return state.entries.length;
      },
      
      getAverageScore: () => {
        const state = get();
        if (state.entries.length === 0) return 0;
        
        const totalScore = state.entries.reduce((sum, entry) => sum + entry.totalScore, 0);
        return Math.round(totalScore / state.entries.length);
      },
      
      getHighestScore: () => {
        const state = get();
        if (state.entries.length === 0) return 0;
        
        return state.entries[0]?.totalScore || 0;
      },
    }),
    {
      name: STORAGE_KEYS.LEADERBOARD,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        entries: state.entries,
      }),
      merge: (persistedState, currentState) => {
        const persistedEntries = (persistedState as any)?.entries || [];
        
        if (persistedEntries.length === 0) {
          return {
            ...currentState,
            entries: MOCK_LEADERBOARD_DATA,
          };
        }
        
        const mockUsernames = MOCK_LEADERBOARD_DATA.map(entry => entry.username);
        const filteredPersisted = persistedEntries.filter((entry: any) => 
          !mockUsernames.includes(entry.username)
        );
        const allEntries = [...MOCK_LEADERBOARD_DATA, ...filteredPersisted]
          .sort((a, b) => {
            if (b.totalScore !== a.totalScore) {
              return b.totalScore - a.totalScore;
            }
            if (b.score !== a.score) {
              return b.score - a.score;
            }
            return a.username.localeCompare(b.username);
          })
          .slice(0, MAX_LEADERBOARD_ENTRIES)
          .map((entry, index) => ({
            ...entry,
            rank: index + 1,
          }));
        
        return {
          ...currentState,
          entries: allEntries,
        };
      },
    }
  )
);
