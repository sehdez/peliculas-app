import { useRef } from 'react';
import { Animated } from 'react-native';


export const useFade = (opacidad:number) => {
    const opacity = useRef( new Animated.Value(opacidad) ).current;

    const fadeIn = ( callback?: ()=> void ) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start(()=> callback ? callback() : null)

    }
    const fadeOut = (duration:number= 300) => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: duration,
                useNativeDriver: true
            }
        ).start()
    }

    return{
        fadeIn,
        fadeOut,
        opacity
    }
}