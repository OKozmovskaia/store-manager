import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const langs = ['en', 'fr', 'nl'];
const defaultLang = 'en';


export default function LanguageScreen() {
  const [lang, changeLang] = useState(defaultLang);
  const insets = useSafeAreaInsets();
  
  return (
    <View>
      <Text>Language Screen:</Text>
      {langs.map((currentLang, i) => (
        <ListItem key={i} onPress={() => changeLang(currentLang)} bottomDivider>
          <ListItem.Content>
            <ListItem.Title h4>{currentLang}</ListItem.Title> 
          </ListItem.Content>
          <ListItem.CheckBox
            checked={currentLang === lang}
            checkedIcon='check'
            uncheckedIcon='check'
            uncheckedColor='#fff'
          />
        </ListItem>
      ))}
    </View>
  )
}