import createDataContext from './createDataContext';

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

const switchToEnglish = dispatch => {
  return() => {
    dispatch({type: 'en', payload: 'en'})
  }
}

const switchToFrench = dispatch => {
  return() => {
    dispatch({type: 'fr', payload: 'fr'})
  }
}

const switchToDutch = dispatch => {
  return() => {
    dispatch({type: 'nl', payload: 'nl'})
  }
}

export const {Povider, Context } = createDataContext(
  languageReducer,
  {switchToEnglish, switchToFrench, switchToDutch},
  {lang: 'en'}
)