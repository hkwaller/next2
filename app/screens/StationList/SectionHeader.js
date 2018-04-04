import React from 'react'
import { Text } from 'react-native'

const SectionHeader = ({title}) => {
    return (
        <Text style={{
            fontSize: 24,
            backgroundColor: '#fff',
            paddingLeft: 20,
            paddingVertical: 10,
        }}>
            { title }
        </Text>
    )
}

export default SectionHeader