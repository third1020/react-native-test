import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuizStore, useUserStore, useLeaderboardStore } from '../store';
import { layout, text, colors, spacing, borders, typography } from '../styles';
import { Timer, ProgressBar } from '../components';
import { useAppNavigation } from '../navigation/hooks';

interface QuizScreenProps {
  navigation?: any;
  route?: any;
}

export function QuizScreen({ navigation, route }: QuizScreenProps) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const questionFadeAnim = useRef(new Animated.Value(1)).current;
  const timerPulseAnim = useRef(new Animated.Value(1)).current;
  
  const quizStore = useQuizStore();
  const userStore = useUserStore();
  const leaderboardStore = useLeaderboardStore();
  const { navigateToResults } = useAppNavigation();
  
  const currentQuestion = quizStore.getCurrentQuestion();
  const isLoading = quizStore.isLoading;

  const selectAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    quizStore.selectAnswer(index);
    
    const isLastQuestion = quizStore.currentQuestionIndex === 19;
    
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      if (isLastQuestion) {
        const attempt = quizStore.completeQuiz();
        if (attempt) {
          userStore.addAttempt(attempt);
          const attemptWithUsername = {
            ...attempt,
            username: userStore.username || 'Anonymous'
          };
          leaderboardStore.addEntry(attemptWithUsername);
        }
        navigateToResults();
      } else {
        Animated.sequence([
          Animated.timing(questionFadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: -50,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          quizStore.nextQuestion();
          setSelectedAnswer(null);
          setIsAnswered(false);
          setTimeLeft(30);
          
          questionFadeAnim.setValue(1);
          slideAnim.setValue(0);
        });
      }
    });
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(questionFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentQuestion]);

  useEffect(() => {
    if (!currentQuestion || isAnswered) return;

    if (timeLeft <= 0) {
      selectAnswer(-1);
      return;
    }

    if (timeLeft <= 10) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(timerPulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(timerPulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      timerPulseAnim.setValue(1);
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, currentQuestion]);
  
  if (isLoading) {
    return (
      <SafeAreaView style={layout.container}>
        <View style={layout.content}>
          <Text style={text.title}>กำลังโหลด...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (!currentQuestion) {
    return (
      <SafeAreaView style={layout.container}>
        <View style={layout.content}>
          <Text style={text.title}>Loading...</Text>
          <Text style={text.subtitle}>กรุณารอสักครู่</Text>
        </View>
      </SafeAreaView>
    );
  }

    return (
      <SafeAreaView style={layout.container}>
        <ScrollView 
          contentContainerStyle={[layout.content, { paddingBottom: spacing['2xl'] }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.xl,
            flexWrap: 'wrap',
            gap: spacing.sm,
          }}>
            <Text style={[text.questionCounter, { flex: 1, minWidth: 120 }]}>
              คำถามข้อที่ {quizStore.currentQuestionIndex + 1} จาก 20
            </Text>
            <Animated.View style={{ transform: [{ scale: timerPulseAnim }] }}>
              <Timer timeLeft={timeLeft} />
            </Animated.View>
            <Text style={{
              fontSize: typography.sm,
              color: colors.primary,
              backgroundColor: colors.primaryLight,
              paddingHorizontal: spacing.md,
              paddingVertical: 6,
              borderRadius: borders.radiusMd,
              fontWeight: typography.medium,
              flex: 1,
              textAlign: 'center',
              minWidth: 100,
            }}>{currentQuestion.category}</Text>
          </View>

          <Animated.View 
            style={[
              layout.card, 
              { 
                marginBottom: spacing['2xl'],
                minHeight: 120,
                justifyContent: 'center',
                opacity: questionFadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <Text style={[text.questionText, { 
              lineHeight: 32,
              fontSize: 20,
            }]}>{currentQuestion.text}</Text>
          </Animated.View>

          <Animated.View style={{ 
            marginBottom: spacing['3xl'],
            gap: spacing.md,
            opacity: questionFadeAnim,
            transform: [{ translateY: slideAnim }],
          }}>
            {currentQuestion.options.map((option, index) => (
              <Animated.View
                key={index}
                style={{
                  transform: selectedAnswer === index ? [{ scale: scaleAnim }] : [{ scale: 1 }],
                  opacity: selectedAnswer === index ? fadeAnim : 1,
                }}
              >
                <TouchableOpacity
                  style={[
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.backgroundSecondary,
                      borderRadius: borders.radiusLg,
                      padding: spacing.lg,
                      borderWidth: borders.widthThin,
                      borderColor: colors.border,
                      minHeight: 60,
                      shadowColor: colors.shadow,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    },
                    selectedAnswer === index && {
                      backgroundColor: colors.primaryLight,
                      borderColor: colors.primary,
                      borderWidth: 2,
                      shadowColor: colors.primary,
                      shadowOpacity: 0.2,
                      elevation: 4,
                    },
                    isAnswered && { opacity: 0.6 },
                  ]}
                  onPress={() => selectAnswer(index)}
                  disabled={isAnswered}
                  activeOpacity={0.7}
                >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: selectedAnswer === index ? colors.primary : colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.lg,
                  shadowColor: colors.shadow,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 1,
                }}>
                  <Text style={{
                    color: selectedAnswer === index ? colors.textInverse : colors.textSecondary,
                    fontWeight: typography.bold,
                    fontSize: typography.lg,
                  }}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={[text.optionText, { 
                  flex: 1,
                  fontSize: 17,
                  lineHeight: 24,
                }]}>{option}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Animated.View>

          <View style={{
            backgroundColor: colors.backgroundSecondary,
            borderRadius: borders.radiusLg,
            padding: spacing.lg,
            marginTop: 'auto',
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.sm,
            }}>
              <Text style={[text.bodySecondary, { fontSize: 14, fontWeight: typography.semibold }]}>
                {quizStore.currentQuestionIndex + 1}/20 ข้อ
              </Text>
            </View>
            <ProgressBar 
              progress={quizStore.currentQuestionIndex / 20} 
              height={8}
              backgroundColor={colors.border}
              progressColor={colors.primary}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

