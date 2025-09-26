import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { layout, text } from '../styles';
import { Button, Input } from '../components';
import { useUserStore, useQuizStore } from '../store';
import { useAppNavigation } from '../navigation/hooks';

interface UsernameScreenProps {
  navigation?: any;
  route?: any;
}

export function UsernameScreen({ navigation, route }: UsernameScreenProps) {
  const [name, setName] = useState('');
  const userStore = useUserStore();
  const quizStore = useQuizStore();
  const { navigateToQuiz, goBack } = useAppNavigation();

  const handleSetUsername = (username: string) => {
    userStore.setUsername(username);
    quizStore.initializeQuiz();
    navigateToQuiz();
  };

  return (
    <SafeAreaView style={layout.container}>
      <View style={layout.content}>
        <View style={layout.header}>
          <Text style={text.title}>กรอกชื่อของคุณ</Text>
          <Text style={text.subtitle}>เพื่อบันทึกคะแนนของคุณ!</Text>
        </View>

        <View style={layout.section}>
          <Input
            label="ชื่อผู้ใช้:"
            placeholder="กรอกชื่อผู้ใช้ของคุณ"
            value={name}
            onChangeText={setName}
            maxLength={20}
            autoFocus
          />
        </View>

        <Button 
          title="ดำเนินการต่อ"
          onPress={() => {
            if (name.trim()) {
              handleSetUsername(name.trim());
            }
          }}
          disabled={!name.trim()}
        />

        <Button 
          title="กลับ"
          variant="secondary"
          onPress={goBack}
        />
      </View>
    </SafeAreaView>
  );
}

