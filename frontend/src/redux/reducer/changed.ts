const changed = (state = "", action:any) => {
    switch (action.type) {
        case "CHANGE":
            return action.data
    
        default:
            return state
    }

}

export default changed