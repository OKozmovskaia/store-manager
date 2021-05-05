import createDataContext from './createDataContext';
import LocalizedStrings from 'react-native-localization';
import english from '../lang/en';
import french from '../lang/fr';
import dutch from '../lang/nl';

const languageReducer = (state, action) => {
  switch(action.type) {
    case 'en':
      return{lang: action.payload};
    
    case 'fr':
      return{lang: action.payload};

    case 'nl':
      return{lang: action.payload};
    
    default:
      return state;
  }
};

export const strings = new LocalizedStrings({
  en: english,
  fr: french,
  nl: dutch,
 });

const switchLanguage = dispatch => {
  return(languageKey) => {
    strings.setLanguage(languageKey)
    dispatch({type: languageKey, payload: languageKey})
  }
}

export const {Povider, Context } = createDataContext(
  languageReducer,
  {switchLanguage},
  {lang: 'en'}
)