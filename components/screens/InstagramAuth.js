import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import config from '../../config.json';

const getCodeForAccessToken = async() => {
  await fetch(
    'https://api.instagram.com/oauth/authorize',
    {
      method: 'GET',
      client_id: config.ID_BUSINESS_ACCOUNT_INSTAGRAM,
      redirect_uri: config.REDIRECT_URL,
      scope: 'user_profile,user_media',
      response_type: 'code'
    })
    .then(res => res.text())
    .then(json => console.log(json))
    .catch(er => console.log(er))
}

export default function InstagramAuth() {
  return (
    <View>
      <Icon.Button
        name="instagram"
        onPress={getCodeForAccessToken}
      >
        <Text>
          Get my feed from Instagram
        </Text>
      </Icon.Button>
    </View>
  );
}
