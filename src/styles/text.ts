import { colors } from './colors';
import { typography } from './typography';

export const text = {
  title: {
    fontSize: typography['4xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center' as const,
    letterSpacing: typography.letterSpacingTight,
  },
  
  subtitle: {
    fontSize: typography.lg,
    color: colors.textSecondary,
    textAlign: 'center' as const,
    fontWeight: typography.normal,
  },
  
  body: {
    fontSize: typography.base,
    color: colors.textPrimary,
    lineHeight: typography.lineHeightNormal,
    fontWeight: typography.normal,
  },
  
  bodySecondary: {
    fontSize: typography.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeightNormal,
    fontWeight: typography.normal,
  },
  
  description: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center' as const,
    lineHeight: typography.lineHeightNormal,
    marginBottom: 24,
    fontWeight: typography.normal,
  },
  
  label: {
    fontSize: typography.base,
    color: colors.textPrimary,
    marginBottom: 8,
    fontWeight: typography.medium,
  },
  
  buttonText: {
    color: colors.textInverse,
    fontSize: typography.base,
    fontWeight: typography.semibold,
  },
  
  buttonTextSecondary: {
    color: colors.textSecondary,
    fontSize: typography.base,
    fontWeight: typography.semibold,
  },
  
  statNumber: {
    fontSize: typography['3xl'],
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: 4,
  },
  
  statLabel: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  
  questionCounter: {
    fontSize: typography.base,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  
  questionText: {
    fontSize: typography.lg,
    color: colors.textPrimary,
    lineHeight: typography.lineHeightRelaxed,
    textAlign: 'center' as const,
    fontWeight: typography.medium,
  },
  
  optionText: {
    flex: 1,
    fontSize: typography.base,
    color: colors.textPrimary,
    fontWeight: typography.normal,
  },
  
  performanceText: {
    fontSize: typography.xl,
    fontWeight: typography.semibold,
    marginBottom: 16,
    textAlign: 'center' as const,
  },
  
  percentageText: {
    fontSize: typography['5xl'],
    fontWeight: typography.bold,
    color: colors.success,
    marginBottom: 8,
  },
  
  scoreText: {
    fontSize: typography.xl,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: typography.medium,
  },
  
  bonusText: {
    fontSize: typography.base,
    color: colors.success,
    marginBottom: 8,
    fontWeight: typography.medium,
  },
  
  totalScoreText: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  
  rank: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
    width: 40,
  },
  
  playerName: {
    flex: 1,
    fontSize: typography.base,
    color: colors.textPrimary,
    marginLeft: 16,
    fontWeight: typography.medium,
  },
  
  playerScore: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  
  playerPercentage: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    fontWeight: typography.normal,
  },
} as const;
