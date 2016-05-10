/** Actions */
export const FAR_ERROR = "FAR ERROR";

/** Action creators */
export function farError() {
    return {
        type: FAR_ERROR,
        payload: "You are too far from the message to read it. You should be maximum 3 meters away."
    };
}