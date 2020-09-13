import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  repeat,
} from "react-native-reanimated";

const App = () => {
  const offset = useSharedValue([0, 0]);
  const viewLayout = useSharedValue([0, 0]);
  const duration = 600;

  const animatedStyles = useAnimatedStyle(() => {
    const easing = Easing.inOut(Easing.sin);

    return {
      transform: [
        {
          translateX: withTiming((offset.value[0] ?? 1) * viewLayout.value[0], {
            duration,
            easing,
          }),
        },
        {
          translateY: withTiming((offset.value[1] ?? 1) * viewLayout.value[1], {
            duration,
            easing,
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View
          style={styles.content}
          onLayout={({
            nativeEvent: {
              layout: { width, height },
            },
          }) => {
            viewLayout.value = [width - 40, height - 40];
          }}
        >
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Animated.View style={animatedStyles}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  offset.value = [Math.random(), Math.random()];
                }}
              />
            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  box: {
    backgroundColor: "#056674",
    borderRadius: 10,
    width: 40,
    height: 40,
  },
});

export default App;
