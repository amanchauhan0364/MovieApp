import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

interface PropsTypes {
  item: {
    poster_path: string;
    original_title: string;
    overview: string;
    release_date: string;
  };
}

export const RenderMovieCard = ({item}: PropsTypes) => {
  return (
    <View style={styles.main}>
      <View>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}
          style={styles.image}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={{fontWeight: 'bold'}} numberOfLines={1}>
          {item.original_title}
        </Text>
        <Text style={styles.overviewText} numberOfLines={3}>
          {item.overview}
        </Text>
        <Text style={{fontSize: 12}} numberOfLines={3}>
          {'Release Date ' + item.release_date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#00000020',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    backgroundColor: 'white',
    elevation: 4,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  textWrapper: {
    marginLeft: 16,
    flex: 1,
  },
  overviewText: {
    color: '#00000080',
    fontSize: 12,
    paddingVertical: 4,
  },
});
