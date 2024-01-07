import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FooterMenu from '../components/Menus/FooterMenu';

const Myposts = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-between',
    marginTop: 40,
  },
});

export default Myposts;