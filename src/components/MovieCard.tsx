import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Movie, Cast } from '../interfaces/movieInterface';

interface Props {
    movie   : Movie
    width?  : number;
    height? : number;
    onPrees?: boolean;
    cast?   : Cast
}

const MovieCard = ( { movie, height = 370, width= 250, onPrees= true, cast }: Props ) => {
    const uri = (cast && cast?.profile_path) 
                    ? `https://image.tmdb.org/t/p/w500${ cast.profile_path }`
                    : `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const {navigate} = useNavigation()
    if( onPrees ){
        return (
    <TouchableOpacity 
        onPress={ () => { navigate('DetailScreen' as never, {movie} as never) } }
        activeOpacity={0.5}
        style={{
            width,
            height,
            marginHorizontal:3,
            borderRadius:18,
    }}>
        <View style = {styles.card}>
            <Image 
                source={{ uri }} 
                style={ styles.image }    
                />
        </View>
    </TouchableOpacity>
    )
    } else{
        return (
            <View style={{
                    width,
                    height,
                    marginHorizontal:3,
                    borderRadius:20,
                    margin:20,
            }}>
                <View style = {styles.card}>
                    <Image 
                        source={{ uri }} 
                        style={ styles.image }    
                        />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        flex:1,
        borderRadius: 20,
        borderWidth:1,
        borderColor: 'rgba(255,255,255,0.08)'
    },
    image: {
        flex: 1,
        borderRadius: 20
    }
})

export default MovieCard