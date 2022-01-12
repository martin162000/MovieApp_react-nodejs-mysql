const historyMovies = (state = false, action:any) => {
    switch (action.type) {
        case "SET_HISTORYMOVIES":
            return action.data
    
        default:
            return state
    }

}

export default historyMovies