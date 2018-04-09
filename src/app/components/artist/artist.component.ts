import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {
  artist:any = {};
  tracks:any[] = [];

  constructor(private activatedRoute: ActivatedRoute, public _spotify: SpotifyService) { }

  ngOnInit() {
    // Obtenemos el id del artista de la url.
    this.activatedRoute.params
    .map( params => params['id'] )
    .subscribe(
      id => {
        this._spotify.getArtist( id ).subscribe(
          artist => {
            this.artist = artist;
            console.log('Artista', this.artist);
          }
        );

        this._spotify.getTopTracks( id )
        .map(( response:any ) => response.tracks )
        .subscribe(
          topTracks => {
            console.log( 'Top tracks', topTracks );
            this.tracks = topTracks;
          }
        );
      }
    );
  }

}
