
import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {
    render() {
        const film = this.props.film
        const displayDetailForFilm = this.props.displayDetailForFilm
        return (
            <TouchableOpacity style={styles.main_container}
                              onPress={() => displayDetailForFilm(film.id)}>
                <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(film.poster_path)}}
                />
                <View style={styles.secondary_container}>
                    <View style={styles.header}>
                        <View style={styles.title_container}>
                            <Text style={styles.title_text}>{film.title}</Text>
                        </View>
                        <View style={styles.vote_container}>
                            <Text>Note : {film.vote_average}</Text>
                        </View>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    </View>

                    <View style={styles.sorti_container}>
                        <Text>Sorti le {film.release_date}</Text>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        marginTop: 20,
        flex: 1,
        flexDirection: 'row'
    },
    title_text: {
        fontSize: 14
    },
    description_text: {
        color: 'gray'
    },
    image: {
        flex: 1,
        marginRight: 10
    },
    secondary_container: {
        flex: 2
    },
    header: {
        flex: 1,
        flexDirection: 'row'
    },
    title_container: {
        flex: 2
    },
    vote_container: {
        flex: 1
    },
    description_container: {
        flex: 3,
        color: 'grey'
    },
    sorti_container: {
        flex: 1,
        alignItems: 'flex-end'
    }
})

export default FilmItem
