import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";



const Logout = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3001/logout").then((response) => {
            if(response.data.seassionIn === true) {
                dispatch({
                    type: "ADD_USERID",
                    data: false
              });
            } 
        })
        history.push("/firstReactApp");
    }, [dispatch, history])


    return (
        <div>
            
        </div>
    )
}

export default Logout
