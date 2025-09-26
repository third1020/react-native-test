import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLeaderboardStore } from '../store';
import { layout, text } from '../styles';
import { Button } from '../components';
import { useAppNavigation } from '../navigation/hooks';

interface LeaderboardScreenProps {
  navigation?: any;
  route?: any;
}

export function LeaderboardScreen({ navigation, route }: LeaderboardScreenProps) {
  const leaderboardStore = useLeaderboardStore();
  const { navigateToWelcome } = useAppNavigation();
  const topEntries = leaderboardStore.getTopEntries(10);
  
    return (
      <SafeAreaView style={layout.container}>
        <ScrollView contentContainerStyle={layout.content}>
          <View style={layout.header}>
            <Text style={text.title}>🏆 Leaderboard</Text>
            <Text style={text.subtitle}>Top Players</Text>
          </View>

          {topEntries.length === 0 ? (
            <View style={layout.section}>
              <Text style={text.description}>
                No scores yet. Be the first to play!
              </Text>
            </View>
          ) : (
            <View style={layout.list}>
              {topEntries.map((entry, index) => (
                <View key={`${entry.username}-${index}`} style={layout.listItem}>
                  <Text style={text.rank}>#{entry.rank}</Text>
                  <Text style={text.playerName}>{entry.username}</Text>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={text.playerScore}>{entry.totalScore} pts</Text>
                    <Text style={text.playerPercentage}>{entry.percentage}%</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <Button title="กลับหน้าหลัก" onPress={navigateToWelcome} />
        </ScrollView>
      </SafeAreaView>
    );
}

