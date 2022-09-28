import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {PieChart} from './src/PieChart';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PieChart />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default App;
