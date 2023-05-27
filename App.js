import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/SignInScreen/SignInScreen';
import SignUpScreen from './src/SignUpScreen/SignUpScreen';
import HomeScreen from './src/HomeScreen/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  },
});
