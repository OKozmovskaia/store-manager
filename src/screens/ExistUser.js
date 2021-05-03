import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ExistUser ({navigation: {navigate}, route}) {

  useEffect(() => {
    const redirectToFeed = async() => {
      const token = await AsyncStorage.getItem('token');
      navigate('InstagramFeed', { token: token});
    };

    setTimeout(()=> {
      redirectToFeed();
    }, 20000)        
  }, []);

  const userName = route.params.username;
  const pointsStr = route.params.points;
  const points = pointsStr.replace(/\//g,'');

  return(
    <View style={styles.newExistScreenContainer}>
      <Text style={styles.newExistScreenText} >Congrats {userName}</Text>
      <Text style={styles.newExistScreenText}>We increased your balance points with {points} points</Text>
      <Icon name="gift" style={styles.newExistScreenIcon}/>
    </View>
  )
}

const styles = StyleSheet.create({
  newExistScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 30,
  },
  newExistScreenText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  newExistScreenIcon: {
    fontSize: 150,
    color: '#09b83e',
  }
})