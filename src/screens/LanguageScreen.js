import React, { useState } from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const langs = ['en', 'fr', 'nl'];

export default function LanguageScreen({navigation}) {
  const [lang, changeLang] = useState('en');
  const insets = useSafeAreaInsets();
  
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text h1>Language Screen:</Text>
        <Icon 
          name="times"
          onPress={() => navigation.goBack()}
          size={40}
        />
      </View>
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