# FakeFlix

This project has been created with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.
Created by [Mathias CITRINI](https://www.linkedin.com/in/mathias-citrini/).

## About the project

### Description

This project is a fake Netflix, created in order to learn Angular. It uses the [Open Movie Database API](https://www.omdbapi.com/) to get the movies and series data.

The project is composed of 6 pages:
- **Home** page (/home) : displays a cool banner and some carousels of famous movies and series
- **Search** page (/search) : searches and displays the results of a search
- **WatchList** page (/watchlist) : displays the movies and series that the user has added to his watchlist
- **About** page (/about) : displays some information about me
- **Login** page (/login) : allows the user to log in to his FakeFlix profile
- **Movie details** page (/media/{id}) : displays some information about a movie

✍️ Notes : All the pages, all the CSS and all the services have been written by me, without using any external library or template.

### Data Service

The data service is a service that allows you to get the data from the API Open Movie Database.
It is used each time you need to get movies or series data.
It allows to search a media by name, to get the details of a media by its ID and to get similar movies or series by the name of a media.

⚠️ With the API used, you can only search by title, not by ID.

⚠️ With the free API key, you can only make 1000 requests per day.

### User Service

The user service is a service that allows you to get and set the user data.
As it is a fake login system, the user with which you can log in is static (you can't create a new one).
The user connected and the user watchlist are saved in **localStorage**.

Data saved in localStorage:
- **userConnected** : the user connected. This field is a string.
- **{username}** : the user watchlist, where {username} is the username of the user. This field is an array of media IDs.

If you want to reset the user data, you can remove the localStorage data.

## How to use

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) installed on your computer.

### Installation

1) Clone the repository on your computer:
```bash
git clone https://github.com/DevilMortar/FakeFlix
```
2) Install the dependencies:
```bash
npm install
```
3) Build the project:
```bash
ng build
```

Once the project is built, you can start it.

### Start the project

Run `ng serve`. Navigate to `http://localhost:4200/` to access the project and enjoy!

### Use the website

#### Login

⚠️ Login system is not secure, it's just a fake login system /!\

To use the website, you need to log in with one of the created profiles, like in Netflix.
These profiles are static, so you can't create a new one.
If you didn't log in, you will be redirected to the login page when you try to access another page.

To login in, just click on the profile you want to use.

#### Home page

The home page displays a cool banner with some carousels of famous movies and series.
You can click on the movie or series you want to see more information about it.

#### Search page

The search page allows you to search for movies and series.
You can search ***only by title*** (because of the API used).
You can click on the movie or series you want to see more information about it.

#### WatchList page

The watchlist page displays the movies and series that you have added to your watchlist.
You can click on the movie or series you want to see more information about it.

#### Movie details page

Once you have clicked on a movie, you will be redirected to the movie details page.
This page displays some information about the movie, such as the title, the release date, the genres, the overview, the cast...
You can add the movie to your watchlist by clicking on the "like" button. (heart is now filled)
To remove the movie from your watchlist, click again on the "like" button. (heart is now empty)

#### About page

The about page displays some information about me. (Mathias CITRINI)

## Sources

### Inspiration

This project has been inspired by [Netflix](https://www.netflix.com/) (of course).
This project uses the [Open Movie Database API](https://www.omdbapi.com/) to get the movies and series data.

### Technologies used

- [Node.js](https://nodejs.org/en/)
- [Angular](https://angular.io/)
- [Font Awesome](https://fontawesome.com/)

✍️ Notes : All the CSS apart from the Font Awesome icons has been written by me.

## Contact

If you have any question or encounter any issues, you can contact me by email at [mathiascitrini@gmail.com](mailto:mathiascitrini@gmail.com).

LinkedIn : [Mathias CITRINI](https://www.linkedin.com/in/mathias-citrini/)
School Mail : [Mathias CITRINI - ISEN](mailto:mathias.citrini@isen.yncrea.fr)
