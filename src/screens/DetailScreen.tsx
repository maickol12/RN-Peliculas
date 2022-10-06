import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { MovieDetails } from '../components/MovieDetails';

interface Props extends StackScreenProps<RootStackParams,'DetailScreen'>{};

const screenHeight = Dimensions.get('screen').height;

export const DetailScreen = ( { route,navigation }: Props) => {
  const movie           = route.params;
  const uri             = `https://image.tmdb.org/t/p/w500/${ movie.poster_path }`;

  const { 
          isLoading,
          cast,
          movieFull 
        }               = useMovieDetail( movie.id );

  return (
    <ScrollView>
      <View style={ styles.imageContainer }>
        <View style={ styles.imageBorder }>
          <Image
            source={{uri}}
            style={ styles.posterImage}

          />
        </View>
      </View>
      <View style={ styles.marginContainer  }>
        <Text style={ styles.subtitle }>{movie.original_title}</Text>
        <Text style={ styles.title }>{movie.title}</Text>
      </View>
      { isLoading 
           ? <ActivityIndicator size={30} color='gray' style={{marginTop:20}} />
           : <MovieDetails movieFull={movieFull!} cast={ cast } />
      }
      {/* Boton para cerrar */}
      <View style={styles.backBotton}>
        <TouchableOpacity
          onPress={ () => navigation.pop()}
        >
          <Icon
            color={'white'}
            name='arrow-back-outline'
            size={60}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    imageContainer:{
      width:'100%',
      height:screenHeight*0.7,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      borderBottomEndRadius:25,
      borderBottomStartRadius:25
    },
    imageBorder:{
      flex:1,
      overflow:'hidden',
      borderBottomEndRadius:25,
      borderBottomStartRadius:25
    },
    posterImage:{
      flex:1
    },
    marginContainer:{
      marginHorizontal:20,
      marginTop:20
    },
    subtitle:{
      fontSize:16,
      opacity:0.9,
      color:'black'
    },
    title:{
      fontSize:20,
      fontWeight:'bold',
      color:'black'
    },
    backBotton:{
      position:'absolute',
      zIndex:999,
      elevation:9,
      top:30,
      left:5
    }
});
