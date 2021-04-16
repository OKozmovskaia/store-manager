import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import config from '../../config.json';

export default function InstagramAuth() {
  const [authCode, setAuthCode] = useState('');
  const [token, setToken] = useState('');

  return (
    <View>
      <Icon.Button
        name="instagram"
        // onPress={getCodeForAccessToken}
      >
        <Text>
          Get my feed from Instagram
        </Text>
      </Icon.Button>
    </View>
  );
}
