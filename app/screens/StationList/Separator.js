import React from 'react'
import { View } from 'react-native'

const Separator = () => {
    return (
        <View style={{
            height: 40,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={{
                height: 2,
                backgroundColor: '#000',
                width: 30
            }}/>
        </View>
    )
}

export default Separator