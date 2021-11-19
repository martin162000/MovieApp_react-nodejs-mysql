const user = (state = false, action:any) => {
    switch (action.type) {
        case "ADD_USERID":
            return action.data
    
        default:
            return state
    }

}

export default user