import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context as TokenContext} from '../context/TokenContext';

export default function NewUser ({navigation: {navigate}}) {
  const { state, singUpNewUser, getTokenFromStorage } = useContext(TokenContext);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  
  return(
    <View style={styles.newUserScreenContainer}>
      <Text
      style={styles.newUserScreenText}
      >Would you like to join to our loyalty program?</Text>
      <Icon name="gift" style={styles.newUserScreenIcon}/>
      <View>
        <TextInput
          label='Name'
          style={styles.newUserScreenInput}
          placeholder="Enter your name"
          autoCapitalize='none'
          autoCorrect={false}
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          label='Phone'
          style={styles.newUserScreenInput}
          keyboardType="phone-pad"
          placeholder="Enter your phone"
          autoCapitalize='none'
          autoCorrect={false}
          value={userPhone}
          onChangeText={setUserPhone}
        />
        <Button
          title='Join to loyalty program'
          color='#09b83e'
          onPress={() => {
            singUpNewUser({userName, userPhone});
            setUserName('');
            setUserPhone('');
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  newUserScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20
  },
  newUserScreenText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  newUserScreenIcon: {
    fontSize: 150,
    color: '#09b83e'
  },
  newUserScreenInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 300,
    borderColor: '#a9a9a9',
    borderRadius: 5,
    borderWidth: 1
  }
})