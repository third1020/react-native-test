import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuizStore } from '../store';
import { layout, text, colors, spacing } from '../styles';
import { Button } from '../components';
import { useAppNavigation } from '../navigation/hooks';

interface ResultsScreenProps {
  navigation?: any;
  route?: any;
}

export function ResultsScreen({ navigation, route }: ResultsScreenProps) {
  const quizStore = useQuizStore();
  const { navigateToWelcome, navigateToLeaderboard } = useAppNavigation();
  const score = quizStore.getCurrentScore();
  const totalScore = score + quizStore.getTotalBonusPoints();
  const percentage = Math.round((score / 20) * 100);

  const handlePlayAgain = () => {
    quizStore.resetQuiz();
    navigateToWelcome();
  };
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { emoji: '🎉', text: 'ยอดเยี่ยมมาก!', color: '#10B981' };
    if (percentage >= 80) return { emoji: '🌟', text: 'เยี่ยมมาก!', color: '#10B981' };
    if (percentage >= 70) return { emoji: '👏', text: 'ทำได้ดีมาก!', color: '#F59E0B' };
    if (percentage >= 60) return { emoji: '👍', text: 'ทำได้ดี!', color: '#F59E0B' };
    return { emoji: '💪', text: 'ลองใหม่อีกครั้ง!', color: '#EF4444' };
  };
  
  const performance = getPerformanceMessage();
  
    return (
      <SafeAreaView style={layout.container}>
        <ScrollView contentContainerStyle={layout.content}>
          <View style={layout.header}>
            <Text style={text.title}>เสร็จสิ้นแบบทดสอบ! 🎉</Text>
            <Text style={text.subtitle}>นี่คือผลคะแนนของคุณ</Text>
          </View>

          <View style={[layout.card, { alignItems: 'center', marginBottom: spacing.xl }]}>
            <Text style={[text.performanceText, { color: performance.color }]}>
              {performance.emoji} {performance.text}
            </Text>
            <Text style={text.percentageText}>{percentage}%</Text>
            <Text style={text.scoreText}>ตอบถูก {score}/20 ข้อ</Text>
            {quizStore.getTotalBonusPoints() > 0 && (
              <Text style={text.bonusText}>
                +{quizStore.getTotalBonusPoints()} คะแนนโบนัส!
              </Text>
            )}
            <Text style={text.totalScoreText}>
              คะแนนรวม: {totalScore} คะแนน
            </Text>
          </View>

          <Button title="เล่นอีกครั้ง" onPress={handlePlayAgain} />
          <Button title="View Leaderboard" variant="secondary" onPress={navigateToLeaderboard} />
        </ScrollView>
      </SafeAreaView>
    );
}

