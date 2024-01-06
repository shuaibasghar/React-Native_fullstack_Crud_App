import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import SubmitButton from '../../components/forms/SubmitButton';
import CustomInput from '../../components/forms/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AuthContext} from '../../../context/authContext';

interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({navigation}) => {
  //global state
  const [state, setState] = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert('Please add all the fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      const {data} = await axios.post('/auth/login', {
        email,
        password,
      });
      setState(data);
      await AsyncStorage.setItem('token', JSON.stringify(data));

      Alert.alert(data && data.message);
      navigation.navigate('Home');
      console.log('Login Data', {email, password});
    } catch (error: any) {
      Alert.alert(error.response.data.message);

      setLoading(false);
      console.log('Error in Register', error);
    }
  };

  //temp function to check local storage data
  const checkToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      console.log('Token', token);
    } catch (error) {
      console.log('Error in checkToken', error);
    }
  };
  checkToken();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{marginHorizontal: 20}}>
        <CustomInput
          label={'Email'}
          autoComplete={'email'}
          keyboardType={'email-address'}
          value={email}
          setValue={setEmail}
        />
        <CustomInput
          label={'Password'}
          autoComplete={'password'}
          secureTextEntry={true}
          value={password}
          setValue={setPassword}
        />
      </View>
      {/* <Text>{JSON.stringify({name, email, password}, null, 4)}</Text> */}

      <SubmitButton
        title="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Not a user Register Please{' '}
        <Text
          onPress={() => navigation.navigate('Register')}
          style={styles.link}>
          REGISTER
        </Text>{' '}
      </Text>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', backgroundColor: '#e1d5c9'},
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e2225',
    marginBottom: 20,
  },
  linkText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    color: 'red',
    fontWeight: 'bold',
  },
});
