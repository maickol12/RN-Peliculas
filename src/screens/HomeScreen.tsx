import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Alert, Button, Dimensions, ScrollView, Text, View } from 'react-native'
import ImageColors from 'react-native-image-colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { GradienteBackground } from '../components/GradienteBackground';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { MoviePoster } from '../components/MoviePoster';
import { GradientContext } from '../context/GradientContext';
import { getImageColors } from '../helpers/getColors';
import { useMovies } from '../hooks/useMovies';

const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { nowPlaying,popular,topRated,upcoming,isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  const { setMainColors } = useContext( GradientContext );



  const getPosterColors = async(index: number) => {
    const movie = nowPlaying[index];
    const uri                   = `https://image.tmdb.org/t/p/w500/${ movie.poster_path }`;
    const [primary = 'green',secondary = 'orange']   = await getImageColors(uri);
    setMainColors({primary,secondary})
  }

  useEffect(() => {
    if( nowPlaying.length > 0 ){
      getPosterColors(0);
    }
  }, [nowPlaying])
  

  if( isLoading ){
    return (
      <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
        <ActivityIndicator color={'red'} size={ 100 } />
      </View>
    )
  }


  return (
    <GradienteBackground>
      <ScrollView>
        <View style={{marginTop:top+20}}>
          {/* CAROUSEL PRINCIPAL */}
          <View style={{height:440}}>
            <Carousel
              data={ nowPlaying }
              renderItem={({ item }:any) => <MoviePoster movie={ item }/>}
              sliderWidth={ windowWidth }
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={ index => getPosterColors(index)}
            />
          </View>
          {/* Peliculas en cine */}
        <HorizontalSlider title='En cine' movies={ nowPlaying }/>
          {/* Peliculas populares */}
          <HorizontalSlider title='Populares' movies={ popular }/>
          {/* Peliculas populares */}
          <HorizontalSlider title='Populares' movies={ topRated }/>
          {/* Peliculas por estrenar */}
          <HorizontalSlider title='Peliculas por' movies={ upcoming }/>
        </View>
      </ScrollView>
    </GradienteBackground>
  )
}
