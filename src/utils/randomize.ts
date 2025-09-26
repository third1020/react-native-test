import { Question } from '../types';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
export function shuffleQuestionOptions(question: Question): Question {
  const originalCorrectAnswer = question.options[question.correctAnswer];
  const shuffledOptions = shuffleArray(question.options);
  const newCorrectIndex = shuffledOptions.indexOf(originalCorrectAnswer);
  
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex,
  };
}
export function shuffleQuestions(questions: Question[]): Question[] {
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.map(question => shuffleQuestionOptions(question));
}
export function getRandomQuestions(questions: Question[], count: number): Question[] {
  if (questions.length <= count) {
    return shuffleQuestions(questions);
  }
  
  const shuffled = shuffleArray(questions);
  return shuffleQuestions(shuffled.slice(0, count));
}
export function getBalancedRandomQuestions(
  questionsByCategory: Record<string, Question[]>,
  questionsPerCategory: number
): Question[] {
  const selectedQuestions: Question[] = [];
  
  Object.values(questionsByCategory).forEach(categoryQuestions => {
    const randomFromCategory = getRandomQuestions(categoryQuestions, questionsPerCategory);
    selectedQuestions.push(...randomFromCategory);
  });
  
  return shuffleArray(selectedQuestions);
}
