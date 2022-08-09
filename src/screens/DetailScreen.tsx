import React, { useContext, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, Dimensions, ScrollView, StyleSheet, ActivityIndicator, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';

import MovieCard from '../components/MovieCard';
import { RootStackProps } from '../navigation/Navigation';
import { styles } from '../theme/styles';
import { useMovieDetails } from '../hooks/useMovieDetails';
import CastItem from '../components/CastItem';
import GradientBackground from '../components/GradientBackground';
import { GradiantContext } from '../context/GradiantContext';
import { getImageColors } from '../helpers/getColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackProps, 'DetailScreen'> {
}


const DetailScreen = ( { route  }:Props ) => {
    const { height,width } = Dimensions.get('screen')
    const { movie } = route.params;
    const { isLoading, movieFull, cast } = useMovieDetails(movie.id)
    const {  setMainColors, colors } = useContext( GradiantContext )
    const { top } = useSafeAreaInsets()


    useEffect(()=> {
        const coloresAnteriores = colors;
        const getColors = async () => {
            const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`
            const [ primary = '#084f6a', secondary = '#042e3f' ] = await getImageColors(uri);
            setMainColors({primary, secondary})
        }
        getColors();

        return()=>{
            setMainColors(coloresAnteriores)
        }

    },[])
    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ alignItems: 'center', marginTop: top }}>
                        <MovieCard movie={movie} onPrees={false} height={ height*0.6 } width = { width*0.90 } />
                </View>
                <View>
                    <Text style={ detailStyles.subtitle }>{ movie.original_title }</Text>
                    <Text style={ styles.title }> { movie.title } </Text>
                    
                    { (isLoading)
                        ? (<View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                                <ActivityIndicator color={'white'} size={50} />
                        </View>)
                        : (<View>
                            <Text style={{ 
                                ...detailStyles.subtitle,
                                marginTop: -10
                                }}>
                                <Icon  name='star-outline' size={20} color='#fff' />
                                { ` ${ movieFull?.vote_average.toPrecision(2) } - ` }
                                { movieFull?.genres.map( ( g ) => g.name).join(', ')  }
                            </Text>
                            <Text style={ detailStyles.subtitle }>Sinopsis: </Text>
                            <Text style={ detailStyles.title2 }>{ movieFull?.overview }</Text>
                            <Text style={ detailStyles.subtitle }>Presupuesto: </Text>
                            <Text style={ detailStyles.title }>{currencyFormatter.format(movieFull?.budget!, { code: 'USD' }) }°°</Text>
                            <Text style={ detailStyles.subtitle }>Actores: </Text>
                            <FlatList 
                                data={cast}
                                renderItem = { ({item}:any) => <CastItem movie={movie} cast= {item} />}
                                keyExtractor = {(item) => item.id.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>)
                    }
                </View>
            </ScrollView>
        </GradientBackground>
    )
}
const detailStyles = StyleSheet.create({
    subtitle: {
        marginTop:10,
        marginHorizontal:15,
        fontSize: 16,
        color:'#fff',
        opacity: 0.5
    },
    title: {
        marginHorizontal:15,
        fontSize: 20,
        color:'white',
        fontWeight: 'bold'
    },
    title2: {
        marginHorizontal:15,
        fontSize: 20,
        color:'white',
    }
})


export default DetailScreen