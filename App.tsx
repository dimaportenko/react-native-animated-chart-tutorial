import React from 'react';
import {LogBox, SafeAreaView, StyleSheet} from 'react-native';
import {PieChart} from './src/PieChart';

LogBox.ignoreAllLogs();

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
