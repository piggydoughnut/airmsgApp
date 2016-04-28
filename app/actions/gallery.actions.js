/** Actions */
export const GET_GALLERY_USER = 'GALLERY USER GET';
export const GET_GALLERY_USER_SUCCESS = 'GALLERY USER GET SUCCESS';
export const GET_GALLERY_USER_FAILURE = 'GALLERY USER GET FAILURE';

/** Action creators */
export function getGalleryForUser(user_id, page = 1) {
    return {
        type: GET_GALLERY_USER,
        payload: {
            id: user_id,
            page: page
        }
    };
}