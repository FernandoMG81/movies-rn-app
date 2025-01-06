import { Movie } from '@/infrastructure/interfaces/movie.interface'
import { View, Text, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import MoviePoster from './MoviePoster'
import { useEffect, useRef } from 'react'

interface Props {
  title?: string
  movies: Movie[]
  className?: string
  loadNextPage?: () => void
}
const MovieHorizontalList = ({ title, movies, className, loadNextPage }: Props) => {
  const isLoading = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false
    }, 200)
  }, [movies])

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

    if( isLoading.current ) return

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent

    const isEndReached = (contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width

    if(!isEndReached) return

    isLoading.current = true

    console.log('Cargar siguientes peliculas')

    loadNextPage && loadNextPage()
  }


  return (
    <View className={`${className}`}>
      {title && <Text className='text-2xl font-bold px-4 mb-2'>{title}</Text>}
      

      <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={ movies }
        keyExtractor={(item, i) => `${item.id}-${i}`}
        renderItem={ ({item}) => <MoviePoster id={item.id} poster={item.poster} smallPoster/> }
        onScroll={onScroll}
      />
    </View>
  )
}

export default MovieHorizontalList