import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videogallery',
  templateUrl: './videogallery.component.html',
  styleUrls: ['./videogallery.component.scss'],
})
export class VideogalleryComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  playVideo() {
    // this.slideOpts.autoplay.disableOnInteraction=true;
    //alert("khdlkjl")
    //this.slideOpts.autoplay=false
  }
}
