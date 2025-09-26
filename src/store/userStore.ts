import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, QuizAttempt } from '../types';
import { STORAGE_KEYS, QUIZ_CONFIG } from '../utils/constants';

interface UserState {
  username: string | null;
  attempts: QuizAttempt[];
  isFirstTime: boolean;
  setUsername: (username: string) => void;
  addAttempt: (attempt: QuizAttempt) => void;
  clearUserData: () => void;
  getBestScore: () => number;
  getAverageScore: () => number;
  getTotalQuizzesTaken: () => number;
  getStreakCount: () => number;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      username: null,
      attempts: [],
      isFirstTime: true,
      setUsername: (username: string) => {
        set({ 
          username: username.trim(), 
          isFirstTime: false 
        });
      },
      
      addAttempt: (attempt: QuizAttempt) => {
        const state = get();
        
        const attemptWithUser = {
          ...attempt,
          username: state.username || 'Anonymous',
        };
        
        set(state => ({
          attempts: [...state.attempts, attemptWithUser],
        }));
      },
      
      clearUserData: () => {
        set({
          username: null,
          attempts: [],
          isFirstTime: true,
        });
      },
      getBestScore: () => {
        const state = get();
        if (state.attempts.length === 0) return 0;
        
        return Math.max(...state.attempts.map(attempt => attempt.totalScore));
      },
      
      getAverageScore: () => {
        const state = get();
        if (state.attempts.length === 0) return 0;
        
        const totalScore = state.attempts.reduce((sum, attempt) => sum + attempt.totalScore, 0);
        return Math.round(totalScore / state.attempts.length);
      },
      
      getTotalQuizzesTaken: () => {
        const state = get();
        return state.attempts.length;
      },
      
      getStreakCount: () => {
        const state = get();
        if (state.attempts.length === 0) return 0;
        
        const passingScore = Math.ceil(QUIZ_CONFIG.TOTAL_QUESTIONS * 0.6);
        let streak = 0;
        for (let i = state.attempts.length - 1; i >= 0; i--) {
          if (state.attempts[i].score >= passingScore) {
            streak++;
          } else {
            break;
          }
        }
        
        return streak;
      },
    }),
    {
      name: STORAGE_KEYS.USER_DATA,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        username: state.username,
        attempts: state.attempts,
        isFirstTime: state.isFirstTime,
      }),
    }
  )
);
