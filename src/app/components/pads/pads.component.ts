import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import * as  Links from 'src/assets/links.json' ;
import { PadComponent } from '../pad/pad.component';

@Component({
  selector: 'app-pads',
  templateUrl: './pads.component.html',
  styleUrls: ['./pads.component.css'],
})
export class PadsComponent implements OnInit {

  @ViewChildren('pad') myPads: PadComponent[];
  links: string[];
  constructor() { 
    this.links = Links.loopsLinks;
  }

  ngOnInit() {
  }
  stopAll(){
    this.myPads.forEach(element => element.pause())
    }
  playAll(){
    this.myPads.forEach(element => element.play())
  }

}
