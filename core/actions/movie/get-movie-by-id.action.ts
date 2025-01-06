import { movieApi } from "@/core/api/movie-api"
import { CompleteMovie } from "@/infrastructure/interfaces/movie.interface"
import { MovieDBMovieResponse  } from "@/infrastructure/interfaces/moviedb-movie.response"
import { MovieMapper } from "@/infrastructure/mapper/movie.mapper"

export const getMovieByIdAction = async(id: number | string ): Promise<CompleteMovie> => {
  try {
      const { data } = await movieApi.get<MovieDBMovieResponse>(`/${ id }`)
  

      // console.log(JSON.stringify(movies, null, 2))
  
      return MovieMapper.fromTheMovieDBCompleteMovie(data)
    } catch (error) {
      console.log(error)
      throw 'Cannot load popular movies'
    }
}