const historyUser = (state = false, action:any) => {
    switch (action.type) {
        case "SET_HISTORYUSER":
            return action.data
    
        default:
            return state
    }

}

export default historyUser