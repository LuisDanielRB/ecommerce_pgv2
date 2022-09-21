const initialState = {
    userLogin: JSON.parse(localStorage.getItem('user')),
    userRegister: [],
    events : [],
    eventsDetail: {},
    eventsDB: [],
    isAuthenticated: JSON.parse(localStorage.getItem('jwt')),
    categories: [],
    artists: [],
    places: [],
    searchLive: []

}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'POST_LOGIN':
            localStorage.setItem('jwt', JSON.stringify(action.payload.data.token))
            localStorage.setItem('user', JSON.stringify(action.payload.data))
            return {
                ...state,
                isAuthenticated: true,
            }

        case 'POST_REGISTRO':
            return {
                ...state,
                userRegister: action.payload
            } 

        case 'GET_EVENT_DETAIL':
            return {
                ...state,
                eventsDetail: action.payload
            }

        case 'GET_ALL_EVENTS': 
        return {
            ...state,
            events: action.payload.datos,
            categories: action.payload.uniqueCAtegories,
            artists: action.payload.uniqueArtist,
            places: action.payload.uniquePlace
        }
        case 'POST_EVENT':
            return {
                ...state,
                eventsDB: action.payload
            }

        case 'SEARCH_LIVE':
            return {
                ...state,
                searchLive: action.payload
            }

    default: return state
    }
}
export default rootReducer;