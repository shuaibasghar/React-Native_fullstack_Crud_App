import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

interface CustomInputProps {
  label?: string;
  keyboardType?: any;
  autoComplete?: any;
  secureTextEntry?: boolean;
  value?: string;
  setValue?: (value: string) => void; // Update the type of setValue
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  keyboardType,
  autoComplete,
  secureTextEntry = false,
  value,
  setValue,
}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold'}}>{label}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={text => setValue && setValue(text)} // Add null check for setValue
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },

  inputBox: {
    backgroundColor: '#ffffff',
    color: '#af9f85',
    paddingLeft: 10,
    borderRadius: 10,
    height: 40,
    marginBottom: 20,
    marginTop: 10,
  },
});

export default CustomInput;
