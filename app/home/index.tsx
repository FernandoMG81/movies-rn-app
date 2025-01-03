import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { useMovies } from '@/presentation/hooks/useMovies'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MainSlideshow from '@/presentation/hooks/components/movies/MainSlideshow'
import MovieHorizontalList from '@/presentation/hooks/components/movies/MovieHorizontalList'


const HomeScreen = () => {

  const safeArea = useSafeAreaInsets()
  const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } = useMovies()

  if( nowPlayingQuery.isLoading ){
    return (
      <View className='justify-center items-center flex-1'>
        <ActivityIndicator color='purple' size={40}/>
      </View>
    )
  }


  return (

    <ScrollView>
      <View className='mt-2 pb-10' style= {{ paddingTop: safeArea.top }}>
        <Text className='text-3xl font-bold px-4 mb-2'>MoviesApp</Text>

        {/* Carousel de imagenes */}
        <MainSlideshow movies= { nowPlayingQuery.data ?? [] }/>

        {/* Popular */}
        <MovieHorizontalList
          className='mb-5' 
          title='Populares' 
          movies={ popularQuery.data ?? [] } 
        />

        <MovieHorizontalList 
          title='Mejor calificadas' 
          movies={ topRatedQuery.data ?? [] } 
          className='mb-5' 
        />

        <MovieHorizontalList 
          title='Próximamente' 
          movies={ upcomingQuery.data ?? [] }
          className='mb-5'
        />

      </View>
    </ScrollView>

  )
}

export default HomeScreen