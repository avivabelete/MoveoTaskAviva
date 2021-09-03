import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Activity } from 'src/app/activity';
import { LogService } from 'src/app/log.service';
import  Links  from 'src/assets/links.json' ;
import { PadComponent } from '../pad/pad.component';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-pads',
  templateUrl: './pads.component.html',
  styleUrls: ['./pads.component.css'],
})
export class PadsComponent implements OnInit {

  @ViewChildren('pad') myPads: PadComponent[];
  links: string[];
  isRecording: boolean;
  playing: boolean = false;

  constructor(private logSrv: LogService) { 
    //Get loops links from json file
    this.links = Links.loopsLinks;
  }
  
  ngOnInit() {  }

  playsession(){
    //add- play the session
    this.logSrv.getActivities().subscribe(data => {
      console.log(data);
    })
  }

  onRecord(){
    //start session by deleting the last session
    if(this.isRecording){
      this.logSrv.getActivities().subscribe((data:Activity[]) => {
        data.forEach(element => {
          //check
          this.logSrv.deleteSession(element.id).subscribe();
        });
      });
    }
  }
  getCurrentLoopTime(): number{
    //check the time where the loops are in
    return this.myPads.filter((item:PadComponent)=>
           item.padState)[0].playerRef.nativeElement.currentTime;
  }
  stopAll(){
    // if in recording mode, save the activity
    if(this.isRecording){
      const act: Activity = {id: uuid(), item: 'all',action: 'stop'}
      this.logSrv.addActivity(act).subscribe();
    }
    //stop all loops
    this.playing = false;
    this.myPads.forEach(element => element.pause())
  }
  playAll(){
    // if in recording mode, save the activity
    if(this.isRecording){
      const act: Activity = {id: uuid(), item: 'all',action: 'play'}
      this.logSrv.addActivity(act).subscribe();
    }
    //play all loops
    this.playing = true;
    this.myPads.forEach(element => element.play())
  }
}
