import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

type PieChartProps = {
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  percent?: number;
};

export const PieChart = ({
  size = 200,
  strokeWidth = 20,
  strokeColor = 'black',
  percent = 0.77,
}: PieChartProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (1 - percent) * circumference;

  return (
    <View>
      <Text style={styles.titleStyle}>PieChart</Text>
      <View style={[{width: size, height: size}, styles.rotate]}>
        <Svg viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={strokeColor}
            strokeDashoffset={strokeDashoffset}
            strokeDasharray={circumference}
          />
        </Svg>
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
});
