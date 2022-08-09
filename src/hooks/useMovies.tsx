import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { MovieDBMoviesResponse, Movie } from '../interfaces/movieInterface';

interface MoviesState {
    nowPlaying: Movie[];
    popular   : Movie[];
    topRated  : Movie[];
    upcoming  : Movie[];    
}

const useMovies = () => {

    const [ isLoading, setIsloading ] = useState(true)
    const [ moviesState, setMoviesState ] = useState<MoviesState>({
        nowPlaying: [],
        popular   : [],
        topRated  : [],
        upcoming  : []
    })

    const getMovies = async () => {
        
        const response = await Promise.all([
            movieDB.get<MovieDBMoviesResponse>('/now_playing'),
            movieDB.get<MovieDBMoviesResponse>('/popular'),
            movieDB.get<MovieDBMoviesResponse>('/top_rated'),
            movieDB.get<MovieDBMoviesResponse>('/upcoming')
        ]);
        setMoviesState({
            nowPlaying: response[0].data.results,
            popular:    response[1].data.results,
            topRated:   response[2].data.results,
            upcoming:   response[3].data.results 
        })
        
        setIsloading(false)
    }
    useEffect( ()=> {
        getMovies()
    },[])
    
    return{
        ...moviesState,
        isLoading
    }
}

export default useMovies