import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface SubmitButtonProps {
  handleSubmit: () => void;
  title: string;
  loading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  handleSubmit,
  title,
  loading,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>
        {loading ? 'Please Wait...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e2225',
    height: 50,
    borderRadius: 80,
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 35,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default SubmitButton;
