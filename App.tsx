import React from 'react';
import {Image, View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const pages = [
  {
    backgroundColor: '#f6f7fc',
    image: (
      <Image
        source={require('./images/1.png')}
        resizeMode="contain"
        style={{width: deviceWidth, height: deviceHeight - 60}}
      />
    ),
    title: <View />,
    subtitle: <View />,
  },
  {
    backgroundColor: '#f6c6fa',
    image: (
      <Image
        source={require('./images/2.png')}
        resizeMode="contain"
        style={{width: deviceWidth, height: deviceHeight - 60}}
      />
    ),
    title: <View />,
    subtitle: <View />,
  },
  {
    backgroundColor: '#f8abeb',
    image: (
      <Image
        source={require('./images/3.png')}
        resizeMode="contain"
        style={{width: deviceWidth, height: deviceHeight - 60}}
      />
    ),
    title: <View />,
    subtitle: <View />,
  },
];

const App = (): React.JSX.Element => {
  const [showOnboarding, setShowOnboarding] = React.useState(true);

  React.useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem(
        'onboardingCompleted',
      );
      if (onboardingCompleted) {
        setShowOnboarding(false);
      }
    } catch (error) {
      console.log('Error checking onboarding status:', error);
    }
  };

  const handleOnDone = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      setShowOnboarding(false);
    } catch (error) {
      console.log('Error saving onboarding status:', error);
    }
  };

  return (
    <>
      {showOnboarding ? (
        <Onboarding
          controlStatusBar={false}
          onDone={handleOnDone}
          pages={pages}
          onSkip={handleOnDone}
        />
      ) : (
        <WebView source={{uri: 'https://neonathealth.com/app'}} />
      )}
    </>
  );
};

export default App;
