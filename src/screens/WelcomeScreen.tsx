import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore, useQuizStore } from '../store';
import { layout, text, colors, spacing } from '../styles';
import { Button } from '../components';
import { useAppNavigation } from '../navigation/hooks';

interface WelcomeScreenProps {
  navigation?: any;
  route?: any;
}

export function WelcomeScreen({ navigation, route }: WelcomeScreenProps) {
  const userStore = useUserStore();
  const quizStore = useQuizStore();
  const { navigateToUsername, navigateToQuiz, navigateToLeaderboard } = useAppNavigation();

  const handleStart = () => {
    if (!userStore.username) {
      navigateToUsername();
      return;
    }
    
    console.log('Starting quiz...');
    quizStore.initializeQuiz();
    navigateToQuiz();
  };

  return (
    <SafeAreaView style={layout.container}>
      <ScrollView contentContainerStyle={layout.content}>
        <View style={layout.header}>
          <Text style={text.title}>🧠 แอปทดสอบเชาว์ปัญญา</Text>
          <Text style={text.subtitle}>ทดสอบความรู้ของคุณ!</Text>
        </View>

        <View style={layout.section}>
          <Text style={text.description}>
            ตอบคำถาม 20 ข้อจากหมวดหมู่ต่างๆ ตอบเร็วจะได้คะแนนโบนัส!
          </Text>
          
          {userStore.username && userStore.attempts.length > 0 && (
            <View style={layout.card}>
              <Text style={[text.title, { fontSize: 20, marginBottom: 20, textAlign: 'center' }]}>สถิติของคุณ</Text>
              <View style={layout.grid}>
                <View style={layout.gridItem}>
                  <Text style={text.statNumber}>{userStore.getTotalQuizzesTaken()}</Text>
                  <Text style={text.statLabel}>ครั้งที่เล่น</Text>
                </View>
                <View style={layout.gridItem}>
                  <Text style={text.statNumber}>{userStore.getBestScore()}</Text>
                  <Text style={text.statLabel}>คะแนนสูงสุด</Text>
                </View>
                <View style={layout.gridItem}>
                  <Text style={text.statNumber}>{userStore.getAverageScore()}</Text>
                  <Text style={text.statLabel}>คะแนนเฉลี่ย</Text>
                </View>
              </View>
            </View>
          )}
          
          <View style={layout.card}>
            <Text style={[text.body, { marginBottom: 12, lineHeight: 24 }]}>✨ คำถาม 20 ข้อสุ่มแบบเรียงเปลี่ยน</Text>
            <Text style={[text.body, { marginBottom: 12, lineHeight: 24 }]}>🏆 ระบบให้คะแนนโบนัสตามเวลา</Text>
            <Text style={[text.body, { marginBottom: 12, lineHeight: 24 }]}>📊 Leaderboard</Text>
            <Text style={[text.body, { marginBottom: 12, lineHeight: 24 }]}>🎯  4 หมวดหมู่ความรู้</Text>
          </View>
        </View>

        <Button title="เริ่มทำแบบทดสอบ" onPress={handleStart} />
        <Button title="View Leaderboard" variant="secondary" onPress={navigateToLeaderboard} />
      </ScrollView>
    </SafeAreaView>
  );
}
