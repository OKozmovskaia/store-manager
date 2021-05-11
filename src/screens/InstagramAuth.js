import React from 'react';
import { View, Text, Linking, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import config from '../../config.json';

export default function InstagramAuth({navigation: {navigate}}) {
  const insets = useSafeAreaInsets();
  
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
      >
        <Text style={styles.instagramAuthText}>
          Get my feed from Instagram
        </Text>
      </Icon.Button>
    <Button title='to New User Screen' onPress={() => navigate('NewUser')} />
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
    borderRadius: 6,
    backgroundColor: "#0084ff",
  },
  instagramAuthText: {
    textAlign: "center",
    paddingHorizontal: 8,
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold"
  }
})
