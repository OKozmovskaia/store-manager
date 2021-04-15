import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import config from '../../config.json';

export default function InstagramAuth() {
  return (
    <View>
      <Icon.Button
        name="instagram"
      >
        <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
          Get my feed from Instagram
        </Text>
      </Icon.Button>
    </View>
  );
}
