import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context as TokenContext} from '../context/TokenContext';
import { LocalizationContext } from '../components/Translations';

export default function NewUser ({navigation: {navigate}}) {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const {singUpNewUser} = useContext(TokenContext);
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);

  const redirectToFeed = async() => {
    const token = await AsyncStorage.getItem('token');
    navigate('InstagramFeed', { token: token});
  };

  initializeAppLanguage();

  return(
    <View style={styles.newUserScreenContainer}>
      <Text
      style={styles.newUserScreenText}
      >{translations['phraseToJoinLoyalty']}</Text>
      <Icon name="gift" style={styles.newUserScreenIcon}/>
      <View>
        <TextInput
          label='Name'
          style={styles.newUserScreenInput}
          placeholder={translations['enterYourName']}
          autoCapitalize='none'
          autoCorrect={false}
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          label='Phone'
          style={styles.newUserScreenInput}
          keyboardType="phone-pad"
          placeholder={translations['enterYourName']}
          autoCapitalize='none'
          autoCorrect={false}
          value={userPhone}
          onChangeText={setUserPhone}
        />
        <Button
          title={translations['joinToLoyaltyProgram']}
          color='#09b83e'
          onPress={() => {
            singUpNewUser({userName, userPhone});
            setUserName('');
            setUserPhone('');
            setTimeout(()=> {
              redirectToFeed();
            }, 5000);
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