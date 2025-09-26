import React from 'react';
import { View, Text, TextInput, ViewStyle, TextStyle } from 'react-native';
import { layout, text, colors, spacing } from '../styles';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
  autoFocus?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export function Input({ 
  label,
  placeholder,
  value,
  onChangeText,
  maxLength,
  autoFocus = false,
  containerStyle,
  inputStyle,
  labelStyle
}: InputProps) {
  return (
    <View style={[{ marginVertical: spacing.md }, containerStyle]}>
      {label && (
        <Text style={[text.label, labelStyle]}>{label}</Text>
      )}
      <View style={layout.inputContainer}>
        <TextInput
          style={[text.body, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          autoFocus={autoFocus}
        />
      </View>
    </View>
  );
}
