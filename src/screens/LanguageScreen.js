import React, { useContext } from 'react';
import { View } from 'react-native';
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

  initializeAppLanguage();
  
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text h1>{translations['changeLanguage']}</Text>
        <Icon 
          name="times"
          onPress={() => navigation.goBack()}
          size={40}
        />
      </View>
      {translations.getAvailableLanguages().map((currentLang, i) => (
        <ListItem key={i} onPress={() => setAppLanguage(currentLang)} bottomDivider>
          <ListItem.Content>
            <ListItem.Title h4>{currentLang}</ListItem.Title> 
          </ListItem.Content>
          <ListItem.CheckBox
            checked={currentLang === appLanguage}
            checkedIcon='check'
            uncheckedIcon='check'
            uncheckedColor='#fff' 
          />
        </ListItem>
      ))}
    </View>
  )
}