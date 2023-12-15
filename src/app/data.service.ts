import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, filter, forkJoin, map, Observable, of, tap} from "rxjs";
import {Media} from "./media";
import {MediaDetail} from "./media-detail";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private userService: UserService) {

  }

  /***
    * Search for media by name
    * @param name the name of the media to search
   */
  searchMediaByName(name: string) : Observable<Media[]> {
    const url = "https://www.omdbapi.com/?apikey=c1ce66fb&s=" + name;
    return this.http.get(url).pipe(
      // Map the response to either the transformed data or an empty array
      map((data: any) => {
        if (data.Response === 'True') {
          return data.Search.map((media: Media) => ({
            Title: media.Title,
            Year: media.Year,
            imdbID: media.imdbID,
            Type: media.Type,
            Poster: (media.Poster === 'N/A') ? 'https://via.placeholder.com/300x400.png?text=No+Image' : media.Poster
          }));
        } else {
          return []; // Return an empty array if the condition is not met
        }
      })
    );

  }

  /***
    * Search for similar media
    * @param media the media to search similar medias for
   */
  searchSimilarMedia(media: Media) : Observable<Array<Media>> {
    const words = this.extractMostImportantWord(media.Title)
    const a = words[0]
    const b = words[1]
    if (b === undefined) {
      return this.searchMediaByName(a);
    }

    // Send 2 requests to the API, one for each word
    const url = "https://www.omdbapi.com/?apikey=c1ce66fb&s=";

    return forkJoin([
      this.http.get(url + a),
      this.http.get(url + b)
    ]).pipe(
      map(([data1, data2]: [any, any]) => {
        const results = [];

        if (data1.Response === 'True') {
          results.push(...data1.Search);
        }

        if (data2.Response === 'True') {
          results.push(...data2.Search);
        }

        // Use a Set to track unique IMDb IDs
        const uniqueIds = new Set();

        // Filter out duplicates based on IMDb ID
        const uniqueResults = results.filter((media: any) => {
          if (!uniqueIds.has(media.imdbID)) {
            uniqueIds.add(media.imdbID);
            return true;
          }
          return false;
        });

        const sortedResults = uniqueResults.sort((a, b) => { return b.Title - a.Title });
        console.log(sortedResults);

        return sortedResults.map((media: any) => ({
          Title: media.Title,
          Year: media.Year,
          imdbID: media.imdbID,
          Type: media.Type,
          Poster: (media.Poster === 'N/A') ? 'https://via.placeholder.com/300x400.png?text=No+Image' : media.Poster
        }));
      })
    );

  }

  /***
    * Get media details by IMDb ID
    * @param id the IMDb ID of the media to get
   */
  getMediaById(id: string) : Observable<MediaDetail> {
    const url = "https://www.omdbapi.com/?apikey=c1ce66fb&i=" + id;
    return this.http.get(url).pipe(
      filter((data: any) => data.Response === 'True'),
      map((data: any) => ({
          Title: data.Title,
          Year: data.Year,
          imdbID: data.imdbID,
          Type: data.Type,
          Poster: (data.Poster === 'N/A') ? 'https://via.placeholder.com/300x400.png?text=No+Image' : data.Poster,
          Plot: data.Plot,
          Actors: data.Actors,
          Director: data.Director,
          Genre: data.Genre,
          Runtime: data.Runtime,
          Rated: data.Rated,
          Language: data.Language,
          Country: data.Country,
          Awards: data.Awards,
          imdbRating: (data.imdbRating === 'N/A') ? -1 : data.imdbRating,
          totalSeasons: (data.totalSeasons === 'N/A') ? 0 : data.totalSeasons,
          isLiked: this.userService.isUserLikedMedia(data.imdbID),
          Response: data.Response
        }))
    );
  }

  /***
    * Get medias details by IMDb IDs
    * @param ids the array of IMDb IDs of the medias to get
   */
  getMediaByIds(ids: Array<string>) : Observable<Array<Media>> {
    const mediaObservables = ids.map((id) => this.getMediaById(id));

    // Combine all the observables into one
    return forkJoin(mediaObservables);
  }

  /***
    * Filter the words in a title to extract the most important ones
    * @param title the title to filter the words from
   */
  filterTitleWords(title: string) : Array<string> {
    // Split the title into words
    const words = title.split(' ');

    // Define a list of common words that might not be significant
    const commonWords = ['part', 'volume', 'story', 'episode', 'the', 'from', 'with', 'about', 'as', 'into', 'like', 'through', 'after', 'over', 'between', 'against', 'during', 'without', 'before', 'under', 'around', 'among', 'amongst', 'upon', 'above', 'since', 'until', 'down', 'near', 'below', 'toward', 'beside', 'beyond', 'throughout', 'towards', 'behind', 'within', 'onto', 'amid', 'besides', 'upon', 'concerning', 'onto', 'onto']

    // Most important word
    let filteredWords = words.filter(word => !commonWords.includes(word.toLowerCase()));
    filteredWords = filteredWords.map(word => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    filteredWords = filteredWords.map(word => word.replace(/'s/g,""));
    filteredWords = filteredWords.filter(word => word.length > 2);
    if (filteredWords.length > 1) {
      filteredWords = filteredWords.filter(word => word.length > 3);
    }
    filteredWords = filteredWords.sort((a, b) => a.length - b.length);
    return filteredWords;
  }

  /***
    * Extract the "most important" word from a title
    * @param title the title to extract the word from
   */
  extractMostImportantWord(title:string) : Array<string> {
    const filteredWords = this.filterTitleWords(title);

    if (filteredWords[0] !== null) {
      console.log(`Most important words : ${filteredWords[0]}, ${filteredWords[1]}`);
    } else {
      console.log('No significant words found in the title.');
    }

    // Choose the first remaining word as the most important
    if (filteredWords.length > 0) {
      return filteredWords;
    }

    // If no significant words are found, return null or handle accordingly
    return [];
  }
}
