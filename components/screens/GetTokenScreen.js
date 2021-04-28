import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

import configData from '../../config.json';

export default function GetTokenScreen ({navigation: {navigate}, route}) {
  const [longToken, setLongToken] = useState('');

  useEffect(() => {
      if(!route.params.code) {
        return null;
      }

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
  
      const postDataForGetToken = async() => {
        try {
          const response = await axios({
            method: 'POST',
            url: 'https://api.instagram.com/oauth/access_token',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            data: formBody
          });
          exchangeToken(response.data.access_token);
          return;

        } catch (error) {
          console.log('Error when getting short-token: ', error.config);
        }
        
      }

      const exchangeToken = async (shortToken)  => {
        try {            
          const response = await axios({
            method: 'GET',
            url: 'https://graph.instagram.com/access_token',
            params: {
              grant_type: 'ig_exchange_token',
              client_secret: configData.APP_SECRET,
              access_token: shortToken
            }
          });
          setLongToken(response.data.access_token)
          return;
        } catch (error) {
          console.log('Error when getting long-token: ', error.config);
        } 
      }
    
      postDataForGetToken();
  }, []);
  
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