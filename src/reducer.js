export default (state, action) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: action.joined,
                userName: action.payload.userName,
                roomID: action.payload.roomID,
            };
        case 'ADD_USERS':
            return {
                ...state,
                users: action.payload
            };
        case 'ADD_MASSAGE':
            return {
                ...state,
                massages: action.payload

            };
        case 'ADD_SOCKET':
            return {
                ...state,
                socket: action.payload
            };
        case 'ADD_IMAGE_URL':
            return {
                ...state,
                imageUrl: action.payload
            };
        case 'ADD_IMAGE_DATA':
            return {
                ...state,
                imageData: action.payload
            };


        default:
            return {...state};
    }
}
