import { create } from 'zustand';
import { Quiz, Question, Answer, QuizAttempt } from '../types';
import { QUIZ_CONFIG, SCORING } from '../utils/constants';
import { getRandomQuestions, shuffleQuestions, MOCK_QUESTIONS } from '../data/questions';

interface QuizState {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  answers: Answer[];
  timeRemaining: number;
  isComplete: boolean;
  isLoading: boolean;
  startTime: Date | null;
  initializeQuiz: () => void;
  selectAnswer: (optionIndex: number) => void;
  nextQuestion: () => void;
  updateTimer: (time: number) => void;
  completeQuiz: () => QuizAttempt | null;
  resetQuiz: () => void;
  getCurrentQuestion: () => Question | null;
  getProgress: () => number;
  getCurrentScore: () => number;
  getTotalBonusPoints: () => number;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuiz: null,
  currentQuestionIndex: 0,
  answers: [],
  timeRemaining: QUIZ_CONFIG.TIME_PER_QUESTION,
  isComplete: false,
  isLoading: false,
  startTime: null,
  initializeQuiz: () => {
    set({ isLoading: true });
    
    try {
      console.log('Initializing quiz...');
      
      let randomQuestions = getRandomQuestions();
      console.log('Random questions loaded:', randomQuestions.length);
      
      if (!randomQuestions || randomQuestions.length === 0) {
        console.error('No questions returned from getRandomQuestions - using fallback');
        const fallbackQuestions = MOCK_QUESTIONS.slice(0, 20);
        if (fallbackQuestions.length === 0) {
          throw new Error('No questions available even from fallback');
        }
        randomQuestions = fallbackQuestions;
      }
      
      const questions = shuffleQuestions(randomQuestions);
      console.log('Questions shuffled:', questions.length);
      
      if (!questions || questions.length === 0) {
        console.error('No questions after shuffling');
        throw new Error('No questions available after shuffling');
      }
      
      const quiz: Quiz = {
        id: `quiz_${Date.now()}`,
        questions,
        currentQuestion: 0,
        timeRemaining: QUIZ_CONFIG.TIME_PER_QUESTION,
        isComplete: false,
      };
      
      console.log('Quiz created successfully with', quiz.questions.length, 'questions');
      
      set({
        currentQuiz: quiz,
        currentQuestionIndex: 0,
        answers: [],
        timeRemaining: QUIZ_CONFIG.TIME_PER_QUESTION,
        isComplete: false,
        isLoading: false,
        startTime: new Date(),
      });
      
      console.log('Quiz initialization completed successfully');
    } catch (error) {
      console.error('Failed to initialize quiz:', error);
      set({
        currentQuiz: null,
        currentQuestionIndex: 0,
        answers: [],
        timeRemaining: QUIZ_CONFIG.TIME_PER_QUESTION,
        isComplete: false,
        isLoading: false,
        startTime: null,
      });
    }
  },
  
  selectAnswer: (optionIndex: number) => {
    const state = get();
    const currentQuestion = state.getCurrentQuestion();
    
    if (!currentQuestion || state.isComplete) return;
    
    const timeSpent = QUIZ_CONFIG.TIME_PER_QUESTION - state.timeRemaining;
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    let bonusPoints = 0;
    if (isCorrect) {
      if (timeSpent < 10) bonusPoints = SCORING.TIME_BONUS.FAST;
      else if (timeSpent < 20) bonusPoints = SCORING.TIME_BONUS.MEDIUM;
      else if (timeSpent < 30) bonusPoints = SCORING.TIME_BONUS.SLOW;
      else bonusPoints = SCORING.TIME_BONUS.TIMEOUT;
    }
    
    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedOption: optionIndex,
      isCorrect,
      timeSpent,
      bonusPoints,
    };
    
    set(state => ({
      answers: [...state.answers, answer],
    }));
  },
  
  nextQuestion: () => {
    const state = get();
    const nextIndex = state.currentQuestionIndex + 1;
    
    if (nextIndex >= QUIZ_CONFIG.TOTAL_QUESTIONS) {
      set({
        isComplete: true,
        currentQuestionIndex: nextIndex,
      });
    } else {
      set({
        currentQuestionIndex: nextIndex,
        timeRemaining: QUIZ_CONFIG.TIME_PER_QUESTION,
      });
    }
  },
  
  updateTimer: (time: number) => {
    set({ timeRemaining: time });
    
    if (time <= 0) {
      const state = get();
      const currentQuestion = state.getCurrentQuestion();
      
      if (currentQuestion && !state.answers.find(a => a.questionId === currentQuestion.id)) {
        const answer: Answer = {
          questionId: currentQuestion.id,
          selectedOption: -1,
          isCorrect: false,
          timeSpent: QUIZ_CONFIG.TIME_PER_QUESTION,
          bonusPoints: 0,
        };
        
        set(state => ({
          answers: [...state.answers, answer],
        }));
      }
      
      state.nextQuestion();
    }
  },
  
  completeQuiz: () => {
    const state = get();
    
    if (!state.currentQuiz || !state.startTime) return null;
    
    const endTime = new Date();
    const totalTimeSpent = Math.floor((endTime.getTime() - state.startTime.getTime()) / 1000);
    
    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      username: '', // This will be set by userStore.addAttempt()
      answers: state.answers,
      score: state.getCurrentScore(),
      bonusPoints: state.getTotalBonusPoints(),
      totalScore: state.getCurrentScore() + state.getTotalBonusPoints(),
      completedAt: endTime,
      timeSpent: totalTimeSpent,
    };
    
    return attempt;
  },
  
  resetQuiz: () => {
    set({
      currentQuiz: null,
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: QUIZ_CONFIG.TIME_PER_QUESTION,
      isComplete: false,
      isLoading: false,
      startTime: null,
    });
  },
  getCurrentQuestion: () => {
    const state = get();
    if (!state.currentQuiz || state.currentQuestionIndex >= state.currentQuiz.questions.length) {
      return null;
    }
    return state.currentQuiz.questions[state.currentQuestionIndex];
  },
  
  getProgress: () => {
    const state = get();
    return state.currentQuestionIndex / QUIZ_CONFIG.TOTAL_QUESTIONS;
  },
  
  getCurrentScore: () => {
    const state = get();
    return state.answers.filter(answer => answer.isCorrect).length * SCORING.BASE_POINTS;
  },
  
  getTotalBonusPoints: () => {
    const state = get();
    return state.answers.reduce((total, answer) => total + answer.bonusPoints, 0);
  },
}));
