import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import { useHistory, useParams} from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import  {apiKey}  from '../types/types'


const Details = () => {

    const state = useSelector((state:any) => state)
    const dispatch = useDispatch();
    const { movieId } = useParams<{ movieId: string }>();
    const refBlockDetails:any = useRef(null);
    const history = useHistory();


    const [movieDetails, setMovieDetails] = useState(
        {
            Title: "",
            Released: "released", 
            Runtime : "runtime",
            Genre: "genre",
            Director: "director",
            Writer: "writer",
            Actors: "actors",
            Country: "country",
            Plot: "plot",
            imdbRating: "rating",
            Poster: "poster",
            imdbID : "link",
         })



      useEffect(() => {

        if(state.allMovies.movies === undefined && movieId !== undefined) {
            history.push("/firstReactApp");
        }

        axios.get("http://localhost:3001/details").then((response) => {
            if(response.data.details) {
               dispatch({
                   type: "SET_FAVORITE",
                   playload: response.data.details
               });
            }
         })


        const fetchData = async () => {
          const result = await axios({
            method: 'get',
            url:  `https://omdbapi.com/?apikey=${apiKey}&i=${encodeURI(movieId)}`,
            withCredentials: false,
          });


            let movieDetail = result.data
            setMovieDetails(movieDetail) 
        };
        fetchData();

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch, history]);




      const handleClickDetail = () => {
        let detail: string = state.allMovies.detail
        const objMovies:[] = state.allMovies.movies;
        const result:any = objMovies.find( ({ linkApi }) => linkApi === detail );



        axios.post("http://localhost:3001/addFavourite", {
            iduser: state.userInfo.id,
            title: result.title,
            year: result.year,
            linkApi: result.linkApi,
            type: result.type,
            poster: result.poster
          }).then((response) => {

             if(response.data.messageTrue) {
                refBlockDetails.current.classList.add("pulse");
                dispatch({
                    type: "ADD_FAVORITE",
                    playload: result
                });


                axios.post("http://localhost:3001/addMovieHistory", {
                    iduser: state.userInfo.id,
                    title: result.title,
                    linkApi: result.linkApi,
                    type: result.type,
                    action: "ADDED"
                  }).then((response) => {
                      
                  })


             }

          })




        // Duplicite cant add only frontend
       /* if(state.allMovies.favorites !== undefined && state.allMovies.favorites.find( ({ linkApi }:any) => linkApi === detail )) {
        }else if(state.allMovies.favorites === undefined){
            refBlockDetails.current.classList.add("pulse");
            dispatch({
                type: "ADD_FAVORITE",
                playload: result
            });

        }else{
            refBlockDetails.current.classList.add("pulse");
            dispatch({
                type: "ADD_FAVORITE",
                playload: result
            });
        }
          */
      }

      const handleClickLogin = () => {

        history.push("/login");
          
      }

    const showStar = () => {
        if(state.userInfo !== false) {
            if(state.allMovies.favorites && state.allMovies.favorites.some((item:any) => item.linkApi === state.allMovies.detail)) {
                return (<span className="star starActive" onClick={handleClickDetail}>★</span>)
            } else {
            return (<span className="star" onClick={handleClickDetail}>☆</span>)
            }
        } else {
          return( <span className="starLogin" onClick={handleClickLogin}>Please, login to add to favorites</span>) 
        }
    }



    const showDetail = (details:any) => {
        if(!!details.Title) {
            return (
                <article className="detailMovie zoomfadeOut" ref={refBlockDetails}>
                <div className="detailInside">
                    <div className="divstar">
                        {showStar()}</div>
                    <h2>{details.Title}</h2>
                    <div>
                        <div className="detailDivPicture"><img src={details.Poster} alt="movie art" /> </div>

                        <div className="detailText">  
                            <p> <strong>Rating:</strong> {details.imdbRating} </p>
                            <p> <strong>Genre:</strong> {details.Genre} </p> 
                            <p> <strong>Runtime:</strong> {details.Runtime} </p> 
                            <p> <strong>Country:</strong> {details.Country} </p> 
                            <p> <strong>Director:</strong> {details.Director}  </p> 
                            <p> <strong>Writer:</strong> {details.Writer}  </p> 
                            <p> <strong>Actor:</strong> {details.Actors} </p> 
                            <p> <strong>Released:</strong>  {details.Released}</p> 
                        </div>

                    </div>

                    <div className="plot">
                    <strong>Plot:</strong> {details.Plot} 
                    </div>

                </div>
            </article>
        
         )} else if(movieId) {
            return (<div>...Loading</div>) 
        }
        else {
           return (<div className="zoomfadein">You must search and choice movie or tv series for show his details</div>) 
       }
    }





    return (
             <div>
                 <h1>Movie details </h1>
                    {showDetail(movieDetails)}


      </div>
    )
}

export default Details
