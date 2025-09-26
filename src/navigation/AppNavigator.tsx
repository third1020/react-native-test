import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { UsernameScreen } from '../screens/UsernameScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Username: undefined;
  Quiz: undefined;
  Results: undefined;
  Leaderboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{
            title: 'Welcome',
          }}
        />
        
        <Stack.Screen 
          name="Username" 
          component={UsernameScreen}
          options={{
            title: 'Enter Username',
            gestureEnabled: true,
          }}
        />
        
        <Stack.Screen 
          name="Quiz" 
          component={QuizScreen}
          options={{
            title: 'Quiz',
            gestureEnabled: false, // Prevent back gesture during quiz
          }}
        />
        
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen}
          options={{
            title: 'Results',
            gestureEnabled: false, // Prevent back gesture from results
          }}
        />
        
        <Stack.Screen 
          name="Leaderboard" 
          component={LeaderboardScreen}
          options={{
            title: 'Leaderboard',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
