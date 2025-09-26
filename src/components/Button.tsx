import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { layout, text } from '../styles';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ 
  onPress, 
  title, 
  variant = 'primary', 
  disabled = false,
  style,
  textStyle 
}: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        layout.button,
        variant === 'secondary' && layout.buttonSecondary,
        disabled && layout.buttonDisabled,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        text.buttonText,
        variant === 'secondary' && text.buttonTextSecondary,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
