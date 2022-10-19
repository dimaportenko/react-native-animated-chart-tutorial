import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {generatePieChartData} from './data';
type PieChartProps = {
  size?: number;
  strokeWidth?: number;
};

export type PieChartDataItem = {
  color: string;
  percent: number;
};

export type PieChartData = PieChartDataItem[];

export const PieChart = ({size = 200, strokeWidth = 20}: PieChartProps) => {
  const [data, setData] = React.useState<PieChartData>([]);

  const refresh = () => {
    const generatedData = generatePieChartData();
    setData(generatedData);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text style={styles.titleStyle}>Pie Chart</Text>
      <View style={[{width: size, height: size}, styles.rotate]}></View>
      <View style={styles.buttonWrap}>
        <Button title="Refresh" onPress={refresh} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: '700',
  },
  rotate: {
    transform: [{rotateZ: '-90deg'}],
  },
  buttonWrap: {marginTop: 20},
});
