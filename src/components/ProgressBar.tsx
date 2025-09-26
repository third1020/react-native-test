import React from 'react';
import { View } from 'react-native';
import { colors, borders } from '../styles';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

export function ProgressBar({ 
  progress, 
  height = 6, 
  backgroundColor = colors.border,
  progressColor = colors.primary
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  return (
    <View style={{
      height,
      backgroundColor,
      borderRadius: borders.radiusSm,
      overflow: 'hidden',
    }}>
      <View 
        style={{
          height: '100%',
          width: `${clampedProgress * 100}%`,
          backgroundColor: progressColor,
        }} 
      />
    </View>
  );
}
