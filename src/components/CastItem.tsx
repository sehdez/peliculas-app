import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';
import { Movie, Cast } from '../interfaces/movieInterface';

interface Props {
    movie: Movie;
    cast: Cast
}

const CastItem = ({ movie, cast }: Props) => {
    if(!cast.profile_path){
        return <></>
    }    
    return (
        <View style={ styles.castContainer} >
            <MovieCard movie={movie} onPrees={false} cast={ cast } width={80} height={120} />
            <View style = { styles.textContainer }>
                <Text style={{ color: 'white' }}>{ cast.name } </Text>
                <Text style={{ color: 'white', opacity:0.7, flexWrap: 'wrap' }}>{ cast.character }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    castContainer: {
        width:200,
        flexDirection: 'row',
        marginBottom:10,
        alignItems:'stretch'
    },
    textContainer: {
        marginTop:50, 
        flexDirection:'column', 
        backgroundColor:'#000', 
        width:100 
    }
})

export default CastItem