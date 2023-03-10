// One drawback of reducers is that they are pure functons. We cannot perform side effects with them. We cannot interact witht he outside world
// It's not the best set up if we want to make an API call or work with the browser which we will need to do to maintaining the Queue in local storage
// With apollo we can make a request for data locally without having to depend on an api
function songReducer(state, action) {
    switch (action.type) {
        case "PLAY_SONG": {
            return {
                ...state,
                isPlaying: true
            }
        }
        case "PAUSE_SONG": {
            return {
                ...state,
                isPlaying: false
            }
        }
        case "SET_SONG": {
            return {
                ...state,
                song: action.payload.song
            }
        }
        default:
            return state;
    }
}

export default songReducer;