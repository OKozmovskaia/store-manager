import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import configData from '../../config.json';

export default function GetTokenScreen ({navigation: {navigate}, route}) {
  const [token, setToken] = useState('');
  const [longToken, setLongToken] = useState('');
  
  if(route.params.code) {
    const str = route.params.code;
    const code = str.substring(0, route.params.code.length - 2);

    const dataForFetchToken = {
      "code": code,
      "client_id": configData.ID_BUSINESS_ACCOUNT_INSTAGRAM,
      "client_secret": configData.APP_SECRET,
      "grant_type": 'authorization_code',
      "redirect_uri": configData.REDIRECT_URL
    }

    const formBody = Object.keys(dataForFetchToken).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(dataForFetchToken[key])).join('&');

    async function postDataForGetToken () {
      const response = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: formBody
      })
      .then(res => res.json())
      .then(json => setToken(json.access_token))
      .catch(err => console.log(err))

      exchangeToken(token);
      return;
    }

    async function exchangeToken(shortToken) {
      const response = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${configData.APP_SECRET}&access_token=${shortToken}`)
      .then(res => res.json())
      .then(json => setLongToken(json.access_token))
      .catch(err => console.log(err))
  
      return;
    }

    postDataForGetToken();
    
  }
  
  return (
    <View style={styles.getTokenScreenContainer}>
      {longToken ? navigate('InstagramFeed', { token: longToken }) : <Text style={styles.getTokenScreenText}>Data uploading </Text>}
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
  }
})