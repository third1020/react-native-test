import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export function useAppNavigation() {
  const navigation = useNavigation<NavigationProp>();
  
  const navigateToWelcome = () => {
    navigation.navigate('Welcome');
  };
  
  const navigateToUsername = () => {
    navigation.navigate('Username');
  };
  
  const navigateToQuiz = () => {
    navigation.navigate('Quiz');
  };
  
  const navigateToResults = () => {
    navigation.navigate('Results');
  };
  
  const navigateToLeaderboard = () => {
    navigation.navigate('Leaderboard');
  };
  
  const goBack = () => {
    navigation.goBack();
  };
  
  const resetToWelcome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };
  
  return {
    navigation,
    navigateToWelcome,
    navigateToUsername,
    navigateToQuiz,
    navigateToResults,
    navigateToLeaderboard,
    goBack,
    resetToWelcome,
  };
}
