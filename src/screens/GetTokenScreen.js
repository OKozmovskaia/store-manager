import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Context as TokenContext} from '../context/TokenContext';

export default function GetTokenScreen ({navigation: {navigate}, route}) {

  const {state, getToken} = useContext(TokenContext);

  useEffect(() => {
      if(!route.params.code) {
        return null;
      }

      const str = route.params.code;
      const code = str.substring(0, route.params.code.length - 2);

      getToken({code});
      
  }, []);
  
  return (
    <View style={styles.getTokenScreenContainer}>
      {state.token
      ? navigate('InstagramFeed', {token: state.token})
      : (state.errorMessage 
        ? <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        : <Text style={styles.getTokenScreenText}>Data uploading </Text>)}
    </View>
  )
}

const styles = StyleSheet.create({
  getTokenScreenContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  getTokenScreenText: {
    textAlign: "center",
    paddingHorizontal: 8,
    fontSize: 22,
    color: "#0084ff",
    fontWeight: "bold"
  },
  errorMessage: {
    textAlign: "center",
    paddingHorizontal: 8,
    fontSize: 22,
    color: "red",
    fontWeight: "bold"
  }
})