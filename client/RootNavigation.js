import React from 'react';
import {View, Text} from 'react-native';
import {AuthProvider} from './context/authContext';
import ScreenMenu from './src/components/Menus/ScreenMenu';

const RootNavigation = () => {
  return (
    <AuthProvider>
      <ScreenMenu />
    </AuthProvider>
  );
};

export default RootNavigation;
