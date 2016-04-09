/** Actions */
export const IMAGE_OPEN = "IMAGE_OPEN";

/** Action creators */
export function imageOpen(image) {
    return {
        type: IMAGE_OPEN,
        payload: image
    };
}