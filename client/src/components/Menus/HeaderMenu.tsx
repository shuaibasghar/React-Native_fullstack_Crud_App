import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useContext} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../context/authContext';

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);
  //logout
  const handleLogout = async () => {
    setState({token: '', user: null});
    await AsyncStorage.removeItem('token');
    Alert.alert('logout Successfully');
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5
          name="sign-out-alt"
          color={'red'}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: 'center',
    fontSize: 25,
  },
});

export default HeaderMenu;
