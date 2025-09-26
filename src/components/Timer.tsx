import React from 'react';
import { View, Text } from 'react-native';
import { colors, spacing, borders, typography } from '../styles';

interface TimerProps {
  timeLeft: number;
  warningThreshold?: number;
}

export function Timer({ timeLeft, warningThreshold = 10 }: TimerProps) {
  const isWarning = timeLeft <= warningThreshold;
  
  return (
    <View style={{
      backgroundColor: colors.backgroundTertiary,
      paddingHorizontal: spacing.md,
      paddingVertical: 6,
      borderRadius: borders.radiusMd,
    }}>
      <Text style={{
        fontSize: typography.base,
        color: isWarning ? colors.error : colors.primary,
        fontWeight: typography.semibold,
      }}>
        ⏱️ {timeLeft}วิ
      </Text>
    </View>
  );
}
