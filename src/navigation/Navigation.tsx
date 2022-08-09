import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { Movie } from '../interfaces/movieInterface';
import { StatusBar } from 'react-native';
import { GradiantContext } from '../context/GradiantContext';

export type RootStackProps = {
    HomeScreen  : undefined;
    DetailScreen: { movie: Movie };
}
const Stack = createStackNavigator<RootStackProps>();

const Navigation = () => {
    const { colors } = useContext( GradiantContext );
    return (
        <>
        <StatusBar 
            translucent={true}
            backgroundColor={'transparent'}
            barStyle = 'light-content'
        />
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                animationEnabled:false,
                cardStyle: {
                    backgroundColor:'black'
                }
            }}
        >
            
            <Stack.Screen name="HomeScreen" component={ HomeScreen } />
            <Stack.Screen name="DetailScreen" component={ DetailScreen } />
        </Stack.Navigator>
        </>
    )
}

export default Navigation