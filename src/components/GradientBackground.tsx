import React, { useContext } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { GradiantContext } from '../context/GradiantContext';
import { useEffect } from 'react';
import { useFade } from '../hooks/useFade';
interface Props {
    children: JSX.Element | JSX.Element[]
}

const GradientBackground = ( { children }:Props ) => {

    const { colors, prevColors, setPrevMainColors } = useContext( GradiantContext );
    const { opacity, fadeIn, fadeOut } = useFade(0)
    useEffect(()=> {
        fadeIn(()=> {
            fadeOut(0)
            setPrevMainColors(colors)
        })
    }, [colors])

    return (
        <View style={{ flex:1,  }}>
            <LinearGradient 
                colors={[prevColors.primary, prevColors.secondary, '#000']}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{x:0.5, y:0.1}}
                end={{x:0.5, y:0.7}}
            />
            <Animated.View
                style={{ ...StyleSheet.absoluteFillObject, opacity }}
            >
                <LinearGradient 
                    colors={[colors.primary, colors.secondary, '#000']}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    start={{x:0.5, y:0.1}}
                    end={{x:0.5, y:0.7}}
                />

            </Animated.View>
            { children }
        </View>
    )
}

export default GradientBackground