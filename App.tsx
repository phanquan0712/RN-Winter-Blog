import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/navigations/Routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import FlashMessage from 'react-native-flash-message';
import { StatusBar } from 'expo-status-bar';
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor='transparent' translucent={false}  />
      <Routes />
      <FlashMessage position="top" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
