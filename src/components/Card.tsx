import React from 'react';
import { View, ViewStyle } from 'react-native';
import { layout, spacing } from '../styles';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

export function Card({ children, style, padding = spacing.lg }: CardProps) {
  return (
    <View style={[layout.card, { padding }, style]}>
      {children}
    </View>
  );
}
