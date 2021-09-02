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
  recordSession: boolean = false;
  playing: boolean = false;

  constructor() { 
    this.links = Links.loopsLinks;
  }
  ngOnInit() {
  }
  playsession(){

  }
  onRecord(){
    if(this.recordSession){
      localStorage.clear();
      localStorage.setItem("start record","now")
    } else {
      //activate play session
    }
  }
  getCurrentLoopTime(): number{
    const arr = this.myPads.filter((item:PadComponent)=> item.padState)[0].playerRef.nativeElement.currentTime;
    return arr;
  }
  stopAll(){
    if(this.recordSession)
        localStorage.setItem('All','stop')
    this.playing = false;
    this.myPads.forEach(element => element.pause())
  }
  playAll(){
    if(this.recordSession)
        localStorage.setItem('All','play')
    this.playing = true;
    this.myPads.forEach(element => element.play())
  }

}
