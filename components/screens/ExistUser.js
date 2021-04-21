import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ExistUser () {
  return(
    <View style={styles.newExistScreenContainer}>
      <Text style={styles.newExistScreenText} >Congrats Olga</Text>
      <Text style={styles.newExistScreenText}>We increased your balance points with 100 points</Text>
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