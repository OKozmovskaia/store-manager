import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LocalizationContext } from '../components/Translations';

export default function LanguageScreen({navigation}) {
  const insets = useSafeAreaInsets();
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage
  } = useContext(LocalizationContext);

  useEffect(() => {
    initializeAppLanguage();
  },[]);
  
  return (
    <View>
      <View style={styles.languageContainer}>
        <Text h2 h2Style={styles.languageScreenTitle}>{translations['changeLanguage']}</Text>
        <Icon 
          name="times"
          onPress={() => navigation.goBack()}
          size={40}
          color='#49ADB3'
        />
      </View>
      {translations.getAvailableLanguages().map((currentLang, i) => (
        <ListItem key={i} onPress={() => setAppLanguage(currentLang)} bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.languageText}>{currentLang}</ListItem.Title> 
          </ListItem.Content>
          <ListItem.CheckBox
            checked={currentLang === appLanguage}
            checkedIcon='check'
            uncheckedIcon='check'
            uncheckedColor='#fff'
            checkedColor='#49ADB3'
          />
        </ListItem>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  languageScreenTitle: {
    fontFamily: 'Open Sans'
  },
  languageText: {
    color: '#515050',
    fontSize: 30
  }
})