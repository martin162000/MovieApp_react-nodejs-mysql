import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";




const TheNavigation = () => {

    const state = useSelector((state:any) => state)
    let savedUrlDetail: string = "/details"

    // save details MOVIE param
    if(state.allMovies.detail !== undefined){
       savedUrlDetail = "/details/"+state.allMovies.detail
    }

    const userInfo = () => {
        if(state.userInfo === false) {
        return (
            <nav className="navProfile">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </nav>
        )
     } else {
        return (
            <nav className="navProfile">
                <NavLink to="/profile">{state.userInfo.username}</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </nav>
        )

     }

    }

    return (
    <>
        <nav className="navigation">
            <NavLink to="/firstReactApp/">Movies</NavLink>
            <NavLink to={savedUrlDetail}>Details</NavLink>
            <NavLink to="/favourites">Favourites</NavLink>
        </nav>
        
        {userInfo()}

    </>
    )
}

export default TheNavigation
