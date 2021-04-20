import React from 'react';
import { View, Text } from 'react-native';


export default function Fake ({route}) {
  return (
    <View>
      <Text>Key: {route.key}</Text>
      <Text>Name: {route.name}</Text>
      <Text>Params: {route.params.code}</Text>
    </View>
  )
}