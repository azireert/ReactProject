import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const SearchStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
        screen: FilmDetail,
        navigationOptions: {
            headerBackTitle: 'Rechercher'
        }
    }
});

export default createAppContainer(SearchStackNavigator)
