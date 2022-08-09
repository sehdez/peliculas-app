import React from 'react'
import { View, Text, FlatList } from 'react-native';
import MovieCard from './MovieCard';
import { Movie } from '../interfaces/movieInterface';
import { styles } from '../theme/styles';

interface Props {
    peliculas: Movie[];
    title: string
}

const HorizontalSlider = ({ peliculas, title }: Props) => {
  return (
    <View
        style={{
            height:230,
            marginTop:20
        }}
    >
        <Text style={ styles.title }
        >{ title }
        </Text>
        <FlatList 
            data={peliculas}
            renderItem = { ({item}:any) => 
                <MovieCard movie={ item } height={180} width={100} /> 
            }
            keyExtractor = {(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    </View>
  )
}

export default HorizontalSlider