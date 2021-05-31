import React, { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, TextInput, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context as TokenContext} from '../context/TokenContext';
import { LocalizationContext } from '../components/Translations';

export default function NewUser ({navigation: {navigate}}) {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [modalVisible, setModalVisible] = useState(false); 
  const {singUpNewUser} = useContext(TokenContext);
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);

  useEffect(() => {
    initializeAppLanguage();
  },[]);

  const redirectToFeed = async() => {
    const token = await AsyncStorage.getItem('token');
    navigate('InstagramFeed', { token: token});
  };

  const normalizePhone = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 3) return currentValue;
      if (cvLength < 6) return `${currentValue.slice(0, 2)} ${currentValue.slice(2)}`;
      if (cvLength < 8) return `${currentValue.slice(0, 2)} ${currentValue.slice(2, 5)} ${currentValue.slice(5)}`;
      if (cvLength < 10) return `${currentValue.slice(0, 2)} ${currentValue.slice(2, 5)} ${currentValue.slice(5, 7)} ${currentValue.slice(7)}`;
      return `${currentValue.slice(0, 2)} ${currentValue.slice(2, 5)} ${currentValue.slice(5, 7)}-${currentValue.slice(7, 9)}-${currentValue.slice(9, 11)}`;
    }
  };

  return(
    <View style={styles.newUserScreenContainer}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
            <Text style={styles.newUserScreenText}>{translations['thanksForJoin']}</Text>
        </View>
      </Modal>
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
          placeholder={translations['enterYourPhone']}
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={15}
          value={userPhone}
          onChangeText={value => {setUserPhone(prevState => normalizePhone(value, prevState))}}
        />
        <Button
          title={translations['joinToLoyaltyProgram']}
          color='#49ADB3'
          onPress={() => {
            singUpNewUser({userName, userPhone});
            setUserName('');
            setUserPhone('');
            setModalVisible(true);
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
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Open Sans'
  },
  newUserScreenIcon: {
    fontSize: 150,
    color: '#49ADB3'
  },
  newUserScreenInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 300,
    borderColor: '#A5B9D9',
    borderWidth: 2
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    justifyContent: 'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})