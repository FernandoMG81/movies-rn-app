import { movieApi } from "@/core/api/movie-api";
import { Cast } from "@/infrastructure/interfaces/Cast";
import { MovieDBCreditsResponse } from "@/infrastructure/interfaces/moviedb-credits.response";
import { CastMapper } from "@/infrastructure/mapper/cast.mapper";

export const getMovieCastAction = async(movieId: number)  => {
  try {

      const { data } = await movieApi.get<MovieDBCreditsResponse>(`/${movieId}/credits`);
        
  
      return data.cast.map(CastMapper.fromMovieDBCastToEntity)
    } catch (error) {
      console.log(error)
      throw 'Cannot load now playing movies'
    }
}