import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getStationList } from '../../../lib/api'
import getCurrentLocation from '../../../lib/location'

class StationList extends Component {
    state = {
        stations: [],
        location: {
            longitude: 59.9127752,
            latitute: 10.676301
        }
    }

    componentDidMount() {
        this.getLocation()
    }

    async getLocation() {
        try {
            const loc = await getCurrentLocation()
            const stations = await getStationList(loc.latitude, loc.longitude, 10)

            this.setCurrentLocation(location)
        } catch (error) {
            console.log('error', error)
            this.setCurrentLocation(undefined)
        }
    }

    setCurrentLocation(location) {
        this.setState({ location })
    }

    render() {

        return (
            <View>
                <Text>sup</Text>
            </View>
        )
    }
}

export default StationList