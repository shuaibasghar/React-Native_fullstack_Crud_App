import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AuthContext} from '../../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';

interface Props {
  title: string;
}

const Home: React.FC = () => {
  //global state
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{JSON.stringify(state, null, 4)}</Text>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Home;
