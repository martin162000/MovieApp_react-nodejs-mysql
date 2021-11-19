import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';


const Favourites = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state:any) => state)


    useEffect(() => {
        axios.get("http://localhost:3001/details").then((response) => {
            if(response.data.details) {
               dispatch({
                   type: "SET_FAVORITE",
                   playload: response.data.details
               });
            }
         })
    }, [dispatch])

    const handleClickRemove = (e:any) => {
        const { id } = JSON.parse(e.target.dataset.onclickparam)
        const favoritiesMovies:[] = state.allMovies.favorites;
        const result = favoritiesMovies.filter((movie: any) => movie.linkApi !== id); // Remove by ID

        axios.post("http://localhost:3001/deleteFavourite", {
            linkApi: id
          }).then((response) => {

             if(response.data.messageTrue) {
                dispatch({
                    type: "SET_FAVORITE",
                    playload: result
                  });
             }

          })
          
          
      }

      const handleClickLogin = () => {

        history.push("/login");
          
      }

    const showMovies = (all:any) => {

        if(state.userInfo !== false) {
            if(all === undefined || all.length <= 0) {
                return (
                    <div className="zoomfadein">You haven't saved anything yet. Search for a movie or a tv series and add it to you favourites.  </div>
                )
            } else {
                return (
                    all.map((movie:any) => (
                        <li key={movie.linkApi} className="leftFadeIn">
                            
                            <article className="movieFavorite">
                                <div className="inside">
                                    <h2>{movie.title}</h2>
                                    <div className="imgMovie">
                                        <img src={movie.poster} alt="movie art" />
                                        <Link to={`/details/${movie.linkApi}`}><div className="btn btnDetail"> Details </div></Link>
                                        <div className="btn btnRemove" onClick={handleClickRemove} data-onclickparam={JSON.stringify({ id: movie.linkApi }) }> Remove </div>
                                    </div>
                                </div>
                            </article>
                            
                        </li>
                    ))
                )
            }
        }else {
            return( <span className="starLogin zoomfadein" onClick={handleClickLogin}>Please, login to add to favorites</span>) 
        }
    }

            return (

                    <div>
                        <h1>Favourite movies</h1>
                        <ul className="moviesList">
                            {showMovies(state.allMovies.favorites)} 
                        </ul>
                    </div>
            )
}

export default Favourites
