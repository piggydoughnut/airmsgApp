export const UPDATE_LOCATION="UPDATE LOCATION";

export function updateLocation(location){
    return {
        type: UPDATE_LOCATION,
        payload: {location}
    }
}
