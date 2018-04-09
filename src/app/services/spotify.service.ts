import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
  artists:any[] = [];
  urlSpotify:string = 'https://api.spotify.com/v1/';
  token:string = 'BQD2qXM-x222GJ77VwA_JgwAd2JNn3oYGTZkaH8X-LyX_h5r845ZEFZ62PzT4V0xg5dSd6KjF_pi7_7LRH4';

  constructor(public http: HttpClient) { }

  private getHeaders() :HttpHeaders {
    let headers = new HttpHeaders({
      'authorization': 'Bearer ' + this.token
    });

    return headers;
  }

  getArtists( termino: string ) {
    let url = `${ this.urlSpotify }search?query=${ termino }&type=artist&limit=20`;

    return this.http.get(url, { headers: this.getHeaders() })
    .map(
      response => {
        this.artists = response.artists.items;
        return this.artists;
      }
    );
  }

  getArtist( id: string ) {
    let url = `${ this.urlSpotify }artists/${ id }`;

    return this.http.get(url, { headers: this.getHeaders() });
  }

  getTopTracks( id: string ) {
    let url = `${ this.urlSpotify }artists/${ id }/top-tracks?country=ES`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
