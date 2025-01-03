import { movieApi } from "@/core/api/movie-api"
import { MovieDBMoviesResponse } from "@/infrastructure/interfaces/moviedb-response"
import { MovieMapper } from "@/infrastructure/mapper/movie.mapper"

export const upcomingMoviesAction = async() => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>('/upcoming')

    const movies = data.results.map( MovieMapper.fromTheMovieDBToMovie )

    // console.log(JSON.stringify(movies, null, 2))

    return movies
  } catch (error) {
    console.log(error)
    throw 'Cannot load upcoming movies'
  }
}