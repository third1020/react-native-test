export const QUIZ_CONFIG = {
  TOTAL_QUESTIONS: 20,
  TIME_PER_QUESTION: 30,
  OPTIONS_PER_QUESTION: 4,
  MAX_USERNAME_LENGTH: 20,
} as const;
export const SCORING = {
  BASE_POINTS: 1,
  TIME_BONUS: {
    FAST: 3,
    MEDIUM: 2,
    SLOW: 1,
    TIMEOUT: 0,
  },
} as const;
export const TIMER_THRESHOLDS = {
  SAFE: 0.6,
  WARNING: 0.3,
  CRITICAL: 0.1,
} as const;
export const STORAGE_KEYS = {
  LEADERBOARD: 'quiz_leaderboard',
  USER_DATA: 'quiz_user_data',
  SETTINGS: 'quiz_settings',
} as const;
export const CATEGORIES = {
  GENERAL: 'General Knowledge',
  SCIENCE: 'Science & Technology', 
  HISTORY: 'History',
  GEOGRAPHY: 'Geography',
} as const;
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  HAPTIC_PATTERNS: {
    LIGHT: 'impactLight',
    MEDIUM: 'impactMedium',
    HEAVY: 'impactHeavy',
    SUCCESS: 'notificationSuccess',
    ERROR: 'notificationError',
  },
} as const;
