import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import CustomInput from '../../components/forms/CustomInput';
import SubmitButton from '../../components/forms/SubmitButton';
import axios from 'axios';
interface RegisterProps {
  navigation: any;
}

const Register: React.FC<RegisterProps> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert('Please add all the fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      const {data} = await axios.post('/auth/register', {
        name,
        email,
        password,
      });
      Alert.alert(data && data.message);
      navigation.navigate('Login');
      console.log('Register Data', {name, email, password});
    } catch (error: any) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      console.log('Error in Register', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{marginHorizontal: 20}}>
        <CustomInput label={'Name'} value={name} setValue={setName} />
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
        title="Register"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Already Register Please{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          LOGIN
        </Text>{' '}
      </Text>
    </View>
  );
};

export default Register;

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
