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
  const [startAngle, setStartAngle] = React.useState<number[]>([]);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // const strokeDashoffset = (1 - percent) * circumference;

  const refresh = () => {
    const generatedData = generatePieChartData();
    let angle = 0;
    const angles: number[] = [];
    generatedData.forEach(item => {
      angles.push(angle);
      angle += item.percent * 360;
    });
    setData(generatedData);
    setStartAngle(angles);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <View>
      <Text style={styles.titleStyle}>PieChart</Text>
      <View style={[{width: size, height: size}, styles.rotate]}>
        <Svg viewBox={`0 0 ${size} ${size}`}>
          {data.map((item, index) => {
            return (
              <Circle
                rotation={startAngle[index]}
                key={`${item.color}-${index}`}
                cx={size / 2}
                cy={size / 2}
                originX={size / 2}
                originY={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                stroke={item.color}
                strokeDashoffset={(1 - item.percent) * circumference}
                strokeDasharray={circumference}
              />
            );
          })}
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
