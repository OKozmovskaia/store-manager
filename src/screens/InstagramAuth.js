import React, { useContext, useEffect } from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LocalizationContext } from '../components/Translations';

import config from '../../config.json';

export default function InstagramAuth({navigation: {navigate}}) {
  const insets = useSafeAreaInsets();
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  useEffect(() => {
    initializeAppLanguage();
  },[]);
  
  const enteredURL = `https://www.instagram.com/oauth/authorize?client_id=${config.ID_BUSINESS_ACCOUNT_INSTAGRAM}&redirect_uri=${config.REDIRECT_URL}&scope=user_profile,user_media&response_type=code`;

  const instagramEnteredLink = async() => {
    const enter = await Linking.openURL(enteredURL);
  }
  
  return (
    <View style={styles.instagramAuthContainer}>
      <Icon.Button
        name="instagram"
        onPress={instagramEnteredLink}
        style={styles.instagramAuthButton}
        size={30}
      >
        <Text style={styles.instagramAuthText}>
          {translations['getMyFeedFromInstagram']}
        </Text>
      </Icon.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  instagramAuthContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  instagramAuthButton: {
    backgroundColor: "#49ADB3",
    padding: 20
  },
  instagramAuthText: {
    textAlign: "center",
    paddingHorizontal: 8,
    fontSize: 25,
    color: "#fff",
    fontFamily: 'Open Sans'
  }
})
