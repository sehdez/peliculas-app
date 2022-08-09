import React, { useContext } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { GradiantProvider } from './src/context/GradiantContext';

const AppState = ({ children }: any) => {
    return (
        <GradiantProvider>
            { children }
        </GradiantProvider>
    )
}
const App = () => {

    return (
        <NavigationContainer>
            <AppState>
                <Navigation />
            </AppState>
        </NavigationContainer>
    )
}

export default App