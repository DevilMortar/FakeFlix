export interface MediaDetail {
    Title: string; // title of the movie
    Year: string; // year of the movie
    imdbID: string; // unique id of the movie
    Type: string; // type of the media
    Poster: string; // url of the poster
    Plot: string; // plot of the movie
    Actors: string; // actors of the movie
    Director: string; // director of the movie
    Genre: string; // genre of the movie
    Runtime: string; // runtime of the movie
    Rated: string; // rating of the movie
    Language: string; // language of the movie
    Country: string; // country of the movie
    Awards: string; // awards of the movie
    imdbRating: number; // imdb rating of the movie (out of 10)
    totalSeasons: number; // total seasons of the movie
    isLiked: boolean; // is the movie liked by the user
    Response: boolean; // response of the api
}
