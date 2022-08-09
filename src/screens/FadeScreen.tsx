import React, { useRef } from 'react'
import { Animated, Button, View, Text } from 'react-native';
import { useFade } from '../hooks/useFade';

const FadeScreen = () => {
    
    const { fadeIn, fadeOut, opacity } = useFade(1);

    return (
        <View style={{ 
            flex:1, 
            backgroundColor:'#00f', 
            justifyContent: 'center',
            alignItems:'center'
        }}> 
            <Animated.View style={{
                backgroundColor:'white',
                width: 150,
                height:150,
                borderWidth:10,
                borderColor:'red',
                opacity
            }}>

            </Animated.View>
            <Text></Text>

            <Button 
                onPress={()=>fadeIn()}
                title='Fade in'
            />
            <Text></Text>
            <Button 
                onPress={()=>fadeOut()}
                title='Fade Out'
            />
        </View>
    )
}

export default FadeScreen