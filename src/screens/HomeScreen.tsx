import React, { useContext } from 'react'
import { View, ActivityIndicator, Dimensions, ScrollView, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors'


import useMovies from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import HorizontalSlider from '../components/HorizontalSlider';
import GradientBackground from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { GradiantContext } from '../context/GradiantContext';
import { useEffect } from 'react';

const HomeScreen = () => {
    const { width: windowWidth } = Dimensions.get('window') 
    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { setMainColors } = useContext( GradiantContext );
    const { top } = useSafeAreaInsets()
    
    const getPosterColors = async ( index: number ) => {
        const movie = nowPlaying[index]
        const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`

        const [ primary = '#084f6a', secondary = '#042e3f' ] = await getImageColors(uri);
        
        setMainColors({primary, secondary})
        
    }

    useEffect( ()=> {
        if(nowPlaying.length>0){
            getPosterColors(0);
        }
    }, [nowPlaying])
    
    if (isLoading ){
        return (
            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                <ActivityIndicator color={'white'} size={50} />
            </View>
        )
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 10 }}>
                    <View style={{ height:370 }}>
                        {/* Peliculas Principales */}
                        <Carousel
                            data={ nowPlaying }
                            renderItem = { ({item}:any) => <MovieCard movie={ item } /> }
                            sliderWidth = { windowWidth }
                            itemWidth = { 250 }
                            inactiveSlideOpacity={0.3}
                            onSnapToItem={ getPosterColors }
                            />
                    </View>
                
                    <HorizontalSlider title='Más valoradas' peliculas={ topRated } />
                    <HorizontalSlider title='Populares' peliculas={ popular } />
                    <HorizontalSlider title='Próximas' peliculas={ upcoming } />

                </View>
            </ScrollView>
        </GradientBackground>
    )
}

export default HomeScreen