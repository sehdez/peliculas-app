import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Cast, MovieFull, CastMovie } from '../interfaces/movieInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}
export const useMovieDetails = ( movieId: number ) => {
    const [ state, setState ] = useState<MovieDetails>({
        isLoading: true,
        cast: []

    })

    const getMovieDetails = async () => {

        const [ movieFullResp, castResp] = await Promise.all([
            movieDB.get<MovieFull>(`/${ movieId }`),
            movieDB.get<CastMovie>(`/${ movieId }/credits`)
        ])
        setState({
            isLoading: false,
            movieFull: movieFullResp.data,
            cast: castResp.data.cast
        })
    }

    useEffect( () => {
        getMovieDetails()
    }, [] )

    return{
        ...state
    }
} 