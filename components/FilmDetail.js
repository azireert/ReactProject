import React from 'react'
import {StyleSheet, View, ActivityIndicator, ScrollView, Text, Image} from 'react-native'
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi'
import moment from "moment";
import numeral from 'numeral';

class FilmDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
            isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayFilm() {
        const film = this.state.film;
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.image}
                           source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <View style={styles.title_container}>
                        <Text style={styles.title_text}>{film.title}</Text>
                    </View>
                    <View style={styles.overview_container}>
                        <Text style={styles.description_text}>{film.overview}</Text>
                    </View>
                    <View style={styles.global_infos_container}>
                        <View style={styles.infos_container}>
                            <Text style={styles.info}>Sorti le : {moment(film.release_date).format('d/MM/YYYY')}</Text>
                        </View>
                        <View style={styles.infos_container}>
                            <Text style={styles.info}>Note : {film.vote_average}/10</Text>
                        </View>
                        <View style={styles.infos_container}>
                            <Text style={styles.info}>Nombre de votes : {film.vote_count}</Text>
                        </View>
                        <View style={styles.infos_container}>
                            <Text style={styles.info}>Budget : {numeral(film.budget).format('0,0')} {this._afficherBudget(film.production_countries)}</Text>
                        </View>
                        <View style={styles.infos_container}>
                            <Text style={styles.info}>Genre(s) : {this._afficherList(film.genres)}</Text>
                        </View>
                        <View style={styles.infos_container}>
                            <Text style={styles.info}>Companie(s) : {this._afficherList(film.production_companies)}</Text>
                        </View>
                    </View>

                    {/* Pour l'instant je n'affiche que le titre, je vous laisserais le soin de créer la vue. Après tout vous êtes aussi là pour ça non ? :)*/}
                </ScrollView>
            )
        }
    }

    _afficherList(list) {
        var genre = '';
        for(var i = 0; i < list.length; i++){
            if(i !== list.length-1) {
                genre += list[i].name + "/";
            }else {
                genre += list[i].name;
            }
        }
        return genre;
    }

    _afficherBudget(country) {
        for (var i =0;i < country.length; i++){
            if(country[i].name === 'United States of America'){
                return '$'
            }else {
                return '€'
            }
        }
    }

    render() {

        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'row'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        flex: 1,
        height: 120,
    },
    title_container: {
        alignItems: 'center',
        flex: 1,
        marginBottom: 10,
        marginTop: 10
    },
    overview_container: {
        flex: 1,
    },
    title_text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    description_text: {
        color: 'gray',
        fontStyle: 'italic'
    },
    info : {

    },
    infos_container: {
       flex: 1
    },
    global_infos_container: {
        flex: 1,
        marginBottom: 10,
        marginTop: 10
    }
})

export default FilmDetail
