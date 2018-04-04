import React, { Component } from 'react'
import { View, Text, SectionList } from 'react-native'
import { getStationList } from '../../../lib/api'
import getCurrentLocation from '../../../lib/location'
import Station from './Station'
import SectionHeader from './SectionHeader'
import Separator from './Separator'
import styles from './StationList.styles'

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
            this.setState({
                stations: stations
            })

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
        const { stations } = this.state

        return (
            <View>
                <SectionList
                    sections={createSections(stations)}
                    keyExtractor={station => station.id }
                    renderSectionHeader={({section}) => section.data.length > 0 && <SectionHeader title={section.title} /> }
                    ListEmptyComponent={ () => <Text>nooo</Text> }
                    renderItem={station => <Station station={station} navigation={this.props.navigation} /> }
                    ItemSeparatorComponent={ () => <Separator />}
                    ListFooterComponent={() => <View style={{height: 110}} />}
                />
            </View>
        )
    }
}

function createSections(stations) {
    let sections = []

    if (stations.filter(station => station.preference > 0)) {
        sections.push({
            title: 'Favoritter',
            data: stations.filter(station => station.preference > 0)
        })
    }

    if (stations.filter(station => station.preference === 0)) {
        sections.push({
            title: 'Vanlige',
            data: stations.filter(station => station.preference === 0)
        })
    }

    return sections
}

export default StationList