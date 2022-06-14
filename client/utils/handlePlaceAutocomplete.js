export const handlePlaceAutocomplete = (cb, target, autoComplete, setAddress, address) => {
    const place = autoComplete.getPlace();

    const location = {
        geometry: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        },
        formatted_address: place.address_components[0].long_name
    }

    setAddress({
        ...address,
        [target]: location.formatted_address
    })

    cb(location, false)
}