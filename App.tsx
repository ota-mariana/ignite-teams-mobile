import { ThemeProvider } from 'styled-components';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Groups } from '@screens/Groups';
import { Loading } from '@components/Loading';
import theme from './src/theme';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {
        fontsLoaded ? <Groups /> : <Loading />
      }
    </ThemeProvider>
  );
}