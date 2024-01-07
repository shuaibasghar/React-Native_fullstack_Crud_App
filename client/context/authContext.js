import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const AuthContext = createContext();

//provider
const AuthProvider = ({children}) => {
  //global state
  const [state, setState] = useState({
    user: null,
    token: '',
  });

  //default headers for authorization token
  axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
  //default axios setting
  axios.defaults.baseURL = 'http://192.168.43.223:8080/api/v1';

  //initial local storage data
  useEffect(() => {
    const LoadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem('token');
      //parse josn data
      let loginData = JSON.parse(data);
      setState({...state, user: loginData?.user, token: loginData?.token});
    };
    LoadLocalStorageData();
  }, []);
  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
