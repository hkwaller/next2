import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'
import styles from './Station.styles'

const TRANSPORT_TYPES = {
    WALKING: 'Walking',
    AIRPORT_BUS: 'AirportBus',
    BUS: 'Bus',
    AIRPORT_TRAIN: 'AirportTrain',
    BOAT: 'Boat',
    TRAIN: 'Train',
    TRAM: 'Tram',
    METRO: 'Metro',
    LONGDISTANCE_BUS: 'LongDistanceBus'
}
                    

class Station extends Component {
    
    render() {
        console.log(this.props.station.item)
        
        const {
            name,
            walkingDistance,
            type,
            servedBy,
            lines, 
            distance,
            preference,
            deviations,
        } = this.props.station.item

        return (
            <View style={styles.container}>
                <Text style={styles.name}>{name}</Text>
                <Text>{walkingDistance}min gange / {distance}m</Text>
            </View>
        )
    }
}

export default Station