import React, {FC, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {generatePieChartData} from './data';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ChartArc: FC<{
  startAngle: number;
  center: number;
  radius: number;
  color: string;
  strokeWidth: number;
  percent: number;
  circumference: number;
  progress: Animated.SharedValue<number>;
}> = ({
  startAngle,
  center,
  color,
  radius,
  strokeWidth,
  circumference,
  percent,
  progress,
}) => {
  const animatedProps = useAnimatedProps(() => {
    const angle = interpolate(progress.value, [0, 1], [0, startAngle]);
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference * (1 - percent)],
    );

    return {
      strokeDashoffset,
      transform: [
        {translateX: center},
        {translateY: center},
        {rotate: `${angle}deg`},
        {translateX: -center},
        {translateY: -center},
      ],
    };
  }, [startAngle, circumference, percent, progress]);

  return (
    <AnimatedCircle
      cx={center}
      cy={center}
      originX={center}
      originY={center}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={color}
      strokeDasharray={circumference}
      // @ts-ignore
      animatedProps={animatedProps}
    />
  );
};

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
  const progress = useSharedValue(0);
  const [data, setData] = React.useState<PieChartData>([]);
  const [startAngle, setStartAngle] = React.useState<number[]>([]);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  // const strokeDashoffset = (1 - percent) * circumference;

  const refresh = () => {
    progress.value = 0;
    const generatedData = generatePieChartData();
    let angle = 0;
    const angles: number[] = [];
    generatedData.forEach(item => {
      angles.push(angle);
      angle += item.percent * 360;
    });
    setData(generatedData);
    setStartAngle(angles);
    progress.value = withTiming(1, {
      duration: 1000,
    });
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text style={styles.titleStyle}>PieChart</Text>
      <View style={[{width: size, height: size}, styles.rotate]}>
        <Svg viewBox={`0 0 ${size} ${size}`}>
          {data.map((item, index) => {
            return (
              <ChartArc
                startAngle={startAngle[index]}
                key={`${item.color}-${index}`}
                center={center}
                radius={radius}
                strokeWidth={strokeWidth}
                color={item.color}
                circumference={circumference}
                percent={item.percent}
                progress={progress}
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
