export default () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }),
            error => reject(error),
            {
                enableHighAccuracy: true,
                timeout: 2000,
                maximumAge: 60 * 15 * 1000,
            }
        )
    })
}

