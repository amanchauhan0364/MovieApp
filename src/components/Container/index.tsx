import React from 'react';
import {StyleSheet, View} from 'react-native';

type PropsTypes = {
  children: object;
  styleObj?: object;
};

const Container = ({children = () => {}, styleObj = {}}: PropsTypes) => {
  return <View style={[styles.container, styleObj]}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
