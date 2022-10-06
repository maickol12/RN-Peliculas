import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Cast, CreditsResponse } from "../interfaces/creditsInterface";
import { MovieFull } from "../interfaces/movieInterface";

interface MovieDetail {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[]
}

export const useMovieDetail = (movieId : number) => {
    const [state, setState] = useState<MovieDetail>({
        isLoading:true,
        movieFull: undefined,
        cast:[]
    });

    const getMovieDetails = async() => {
        const movieDetailPromise = movieDB.get<MovieFull>(`/${ movieId }`);
        const castPromise        = movieDB.get<CreditsResponse>(`/${ movieId }/credits`);
        const [movieDetailsResponse,castResponse] = await Promise.all([movieDetailPromise,castPromise]);
        setState({
            isLoading:false,
            movieFull:movieDetailsResponse.data,
            cast: castResponse.data.cast
        })
    }

    useEffect(() => {
      getMovieDetails();
    }, [])
    
    return { 
        ...state
    }
}