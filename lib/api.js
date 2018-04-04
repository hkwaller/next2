import GeoHash from 'geo-hash'
import proj4 from 'proj4'
import { AsyncStorage } from 'react-native'

const STATION_LIST_GEO_HASH_PRECISION = 8; // ≤ 38.2m × 19.1m
const PREFER_STATION_GEO_HASH_PRECISION = 7; // ≤ 153m  × 153m
proj4.defs('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs');

let preferredStationsByGeoHash
try {
    preferredStationsByGeoHash = JSON.parse(AsyncStorage.getItem('preferred-stations')) || {}
} catch (error) {
    preferredStationsByGeoHash = {};
}

export async function getStationList(lat, lng, numberofstops) {
    const cacheKey = 'getStationList:' + GeoHash.encode(lng, lat, STATION_LIST_GEO_HASH_PRECISION) + ':' + numberofstops;

    const coords = proj4('EPSG:25832', {
        x: lng,
        y: lat
    });

    const url = "http://api.trafikanten.no/ReisRest/Stop/GetClosestStopsByCoordinates/?coordinates=x=" + Math.round(coords.x) + ",y=" + Math.round(coords.y) + "&proposals=" + numberofstops;

    return fetch(url)
        .then(data => {
            return data.json()
        })
        .then(stationsData => {
            const stations = stationsData.map(station => {
                console.log(station)
                return {
                    id: station.ID,
                    name: station.Name,
                    walkingDistance: station.WalkingDistance,
                    type: station.Type,
                    deviations: station.Deviations,
                    lines: station.Lines,
                    servedBy: [...new Set(station.Lines.map(line => line.Transportation))],
                    preference: (
                        preferredStationsByGeoHash[geoHash] &&
                        preferredStationsByGeoHash[geoHash][station.ID] &&
                        preferredStationsByGeoHash[geoHash][station.ID].preference
                    ) ||  0
                }
            })

            console.log(stations)

            return stations
        })

    // request
    //     .get(url)
    //     .timeout(STATION_LIST_TIMEOUT)
    //     .end(function(err, res) {
    //         if (err) return callback(err.code);

    //         var stations = res.body;
    //         stations = stations.splice(0, numberofstops);
            
    //         callback(null, augmentStations(stations));
    //     });

    // function augmentStations(stations) {

    //     var obj = {
    //         favorites: [],
    //         regular: [],
    //         hasStations: false
    //     }

        

    //     stations.forEach(function(station, index) {
    //         var latLngXY = proj4('EPSG:25832', 'WGS84', {
    //             x: station.X,
    //             y: station.Y
    //         });

    //         station.Distance = geolib.getDistance({
    //             latitude: lat,
    //             longitude: lng
    //         }, {
    //             latitude: latLngXY.y,
    //             longitude: latLngXY.x
    //         });

    //         var geoHash = GeoHash.encode(lng, lat, PREFER_STATION_GEO_HASH_PRECISION);
    //         station.Preference = (
    //             preferredStationsByGeoHash[geoHash] &&
    //             preferredStationsByGeoHash[geoHash][station.ID] &&
    //             preferredStationsByGeoHash[geoHash][station.ID].preference
    //         ) ||  0;
    //         station.Index = index;

    //         station.ServedBy = [];
    //         station.Lines.forEach(function(lineVal, lineKey) {
    //             if (lineVal.LineID < 10 && (station.ServedBy.indexOf("sub") === -1)) {
    //                 station.ServedBy.push("sub");
    //                 return;
    //             } else if (lineVal.LineID > 10 && lineVal.LineID < 20 && (station.ServedBy.indexOf("trikk") === -1)) {
    //                 station.ServedBy.push("trikk");
    //                 return;
    //             } else if (lineVal.LineID >= 20 && lineVal.LineID < 100 && (station.ServedBy.indexOf("buss") === -1)) {
    //                 station.ServedBy.push("buss");
    //                 return;
    //             } else if (lineVal.LineID > 200 && lineVal.LineID < 1000 && (station.ServedBy.indexOf("greenbus") === -1)) {
    //                 station.ServedBy.push("greenbus");
    //                 return;
    //             }
    //         });

    //         if (station.Preference > 0) {
    //             obj.favorites.push(station);
    //         } else {
    //             obj.regular.push(station);
    //         }
    //     });

    //     if ((obj.favorites.length + obj.regular.length) > 0) obj.hasStations = true;

    //     obj.favorites.sort(function(a, b) {
    //         var dPreference = b.Preference - a.Preference;
    //         var dIndex = a.Index - b.Index;
    //         return dPreference === 0 ? dIndex : dPreference;
    //     });

    //     return obj;
    
}