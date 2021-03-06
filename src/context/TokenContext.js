import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import configData from '../../config.json';
import axios from 'axios';

const tokenReducer = (state, action) => {
  switch(action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    
    case 'get_token':
      return {token: action.payload, errorMessage: ''};

    default:
      return state;
  }
};

const getToken = dispatch => {
  return async({code}) => {
    // make POST request with code for getting shortLived token
    const dataForFetchToken = {
      "code": code,
      "client_id": configData.ID_BUSINESS_ACCOUNT_INSTAGRAM,
      "client_secret": configData.APP_SECRET,
      "grant_type": 'authorization_code',
      "redirect_uri": configData.REDIRECT_URL
    }

    const formBody = Object.keys(dataForFetchToken).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(dataForFetchToken[key])).join('&');

    const exchangeToken = async (shortToken)  => {
      try {            
        const response = await axios({
          method: 'GET',
          url: 'https://graph.instagram.com/access_token',
          params: {
            grant_type: 'ig_exchange_token',
            client_secret: configData.APP_SECRET,
            access_token: shortToken
          }
        });
        console.log('Long-lived token: ', response.data.access_token)
        await AsyncStorage.setItem('token', response.data.access_token);
        dispatch({type: 'get_token', payload: response.data.access_token})
        return;
      } catch (error) {
        console.log(error.message, 'Error when getting long-token: ', error.config);
      } 
    }

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.instagram.com/oauth/access_token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: formBody
      });
      console.log('Short-lived token: ', response.data.access_token)
      exchangeToken(response.data.access_token);
      return;

    } catch (error) {
      console.log(error.message, 'Error when getting short-token: ', error.config);
      dispatch({type: 'add_error', payload: 'Something went wrong with getting token from Instagram'})
    };
  }
}

const singUpNewUser = dispatch => {
  return async({userName, userPhone}) => {
    try {

      const tokenFromServer = await axios({
        method: 'GET',
        url: `${configData.REDIRECT_URL}get-token`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "client_id": configData.CLIENT_ID_SERVER,
          "client_secret": configData.CLIENT_SECRET_SERVER
        }
      });

      const saveNewUser = async(token) => {
        try {
          const response = await axios({
            method: 'POST',
            url: `${configData.REDIRECT_URL}add-user`,
            headers: {
              "Content-Type":"application/json",
              "Authorization" :`Bearer ${token}`
            },
            data: {
              "name": userName,
              "phone": userPhone
            }
          });
          // console.log(response);
          return;

        } catch (error) {
          console.log("Error when saving New User in DB: ", error.message, error.config)
        }
      };

      saveNewUser(tokenFromServer.data.token);
      
    } catch (error) {
      console.log("Error when sending data about New User: ", error.message, error.config)
    }
  }
}

export const {Provider, Context} = createDataContext(
  tokenReducer,
  {getToken, singUpNewUser},
  {token: null, errorMessage: ''}
);