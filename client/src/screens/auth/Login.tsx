import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import SubmitButton from '../../components/SubmitButton';
import CustomInput from '../../components/forms/CustomInput';

interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert('Please add all the fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log('Login Data', {email, password});
    } catch (error) {
      setLoading(false);
      console.log('Error in Register', error);
    }
  };

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
