import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Container from '../../components/Container';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getMovieApp} from '../../redux/actions';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import {RenderMovieCard} from '../../components/Card';
import {AppDispatch} from '../../redux/store';
import {iSearch} from '../../assets';

const SEARCH: string = 'Search';

export const ListFooterComponent = ({loading = false}) => {
  if (loading) {
    return <ActivityIndicator />;
  }
  return null;
};

const MovieApp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [MovieApp, setMovieApp] = useState<object[]>([]);
  const [shouldPaginate, setPaginate] = useState(false);
  const {
    data = [],
    totalPage = 0,
    isLoading = false,
    errorMessage = '',
  } = useSelector(
    ({MovieReducer}) => ({
      data: MovieReducer.data,
      isLoading: MovieReducer.isLoading,
      totalPage: MovieReducer.totalPage,
      errorMessage: MovieReducer.errorMessage,
    }),
    shallowEqual,
  );

  const [page, setPage] = useState(1);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getMovieApp(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (data.length) {
      setLoading(false);
      if (shouldPaginate) {
        setMovieApp(prev => [...prev, ...data]);
        setPaginate(false);
      } else {
        setMovieApp(data);
      }
    }
  }, [data, shouldPaginate]);

  const onEndReached = useCallback(() => {
    if (totalPage > page) {
      setLoading(true);
      setPaginate(true);
      setPage(prev => prev + 1);
      dispatch(getMovieApp(page + 1));
    }
  }, [dispatch, page, totalPage]);

  const navigateToSearch = useCallback(() => {
    navigation.navigate(SEARCH);
  }, [navigation]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (errorMessage !== '') {
    return (
      <View>
        <Text>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <Container>
      <FlashList
        data={MovieApp}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <RenderMovieCard item={item} />}
        estimatedItemSize={200}
        ListFooterComponent={<ListFooterComponent loading={loading} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
      <Pressable style={styles.searchIcon} onPress={navigateToSearch}>
        <Image source={iSearch} style={styles.imageStyle} />
      </Pressable>
    </Container>
  );
};

export default MovieApp;

const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    zIndex: 10,
    bottom: 10,
    borderRadius: 40,
    right: 32,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    backgroundColor: 'white',
    elevation: 4,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
});
