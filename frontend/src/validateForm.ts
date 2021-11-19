const validateForm = (values:any, whichPage:any) => {
    let errors:any = {};

    if(whichPage === "login") {
        if(!values.username.trim()) {
            errors.username = "*Required"
        } else if(values.username.length < 4) {
            errors.username = "Username must contains at least 4 characters"
        } else if(values.username.length > 12) {
            errors.username = "Username could at maximum 12 characters"
        }

        if(!values.password.trim()) {
            errors.password = "*Required"
        } else if(values.password.length < 6) {
            errors.password = "Password must contains at least 6 characters"
        } else if(values.password.length > 18) {
            errors.password = "Password could at maximum 18 characters"
        }


    } else if(whichPage === "register") {
        if(!values.email) {
            errors.email= "*Required"
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email= "Email is bad"
        }
        
        if(!values.username.trim()) {
            errors.username = "*Required"
        } else if(values.username.length < 4) {
            errors.username = "Username must contains at least 4 characters"
        } else if(values.username.length > 12) {
            errors.username = "Username could at maximum 12 characters"
        }

        if(!values.password.trim()) {
            errors.password = "*Required"
        } else if(values.password.length < 6) {
            errors.password = "Password must contains at least 6 characters"
        } else if(values.password.length > 18) {
            errors.password = "Password could at maximum 18 characters"
        }

    } else if(whichPage === "changePassword") {

        if(!values.password.trim()) {
            errors.password = "*Required"
        } else if(values.password.length < 6) {
            errors.password = "Password must contains at least 6 characters"
        } else if(values.password.length > 18) {
            errors.password = "Password could at maximum 18 characters"
        }
    } else if(whichPage === "changeEmail") {
        if(!values.email) {
            errors.email= "*Required"
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email= "Email is bad"
        }
    }

    return errors;
}

export {validateForm}