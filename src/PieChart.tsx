import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
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
  const [startAngles, setStartAngles] = React.useState<number[]>([]);
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const refresh = () => {
    const generatedData = generatePieChartData();

    let angle = 0;
    const angles: number[] = [];
    generatedData.forEach(item => {
      angles.push(angle);
      angle += item.percent * 360;
    });

    setData(generatedData);
    setStartAngles(angles);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text style={styles.titleStyle}>Pie Chart</Text>
      <View style={[{width: size, height: size}, styles.rotate]}>
        <Svg viewBox={`0 0 ${size} ${size}`}>
          {data.map((item, index) => (
            <Circle
              key={`${item.color}-${index}`}
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              stroke={item.color}
              strokeDashoffset={circumference * (1 - item.percent)}
              strokeDasharray={circumference}
              originX={center}
              originY={center}
              rotation={startAngles[index]}
            />
          ))}
        </Svg>
      </View>
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
