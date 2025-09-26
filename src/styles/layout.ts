import { colors } from './colors';
import { spacing } from './spacing';
import { borders } from './borders';
import { shadows } from './shadows';

export const layout = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  
  header: {
    alignItems: 'center' as const,
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  
  section: {
    marginVertical: spacing.lg,
  },
  
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borders.radiusLg,
    padding: spacing.lg,
    borderWidth: borders.widthThin,
    borderColor: colors.border,
    ...shadows.sm,
  },
  
  button: {
    backgroundColor: colors.primary,
    borderRadius: borders.radiusLg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center' as const,
    marginVertical: spacing.sm,
    ...shadows.primary,
  },
  
  buttonSecondary: {
    backgroundColor: colors.transparent,
    borderWidth: borders.widthMedium,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusLg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center' as const,
    marginVertical: spacing.sm,
    ...shadows.none,
  },
  
  buttonDisabled: {
    backgroundColor: colors.backgroundTertiary,
    opacity: 0.6,
  },
  
  inputContainer: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borders.radiusLg,
    padding: spacing.md,
    borderWidth: borders.widthThin,
    borderColor: colors.borderLight,
  },
  
  grid: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
  },
  
  gridItem: {
    alignItems: 'center' as const,
  },
  
  list: {
    marginBottom: spacing.xl,
  },
  
  listItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borders.radiusLg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: borders.widthThin,
    borderColor: colors.border,
  },
} as const;
