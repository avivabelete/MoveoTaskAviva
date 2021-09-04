import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Activity } from 'src/app/activity';
import { LogService } from 'src/app/log.service';
import  Links  from 'src/assets/links.json' ;
import { PadComponent } from '../pad/pad.component';
import { v4 as uuid } from 'uuid';
import { timer } from 'rxjs';


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
  counter: number = 0;
  data: any;

  constructor(private logSrv: LogService) { 
    this.links = Links.loopsLinks;
  }
  
  ngOnInit() {  }

  playsession(){
    this.logSrv.getActivities().subscribe((data: Activity[]) => {
      //Play recorded session
      for(let i=0;i<data.length;i++){
        if(data[i].item === "all"){
              timer(data[i].time).subscribe(()=> data[i].action == 'play' ? this.playAll(): this.stopAll());     
            } else {
              const item = this.myPads.filter((element:PadComponent) => data[i].item === element.loopLink)[0];
              timer(data[i].time).subscribe(()=>data[i].action === 'off' ? item.onStateOff() :item.onStateOn());
            }
        }
      
    })
  }

  onRecord(){
    //Delete previous session
    if(this.isRecording){
      this.logSrv.getActivities().subscribe((data:Activity[]) => {
      data.forEach(element => {
        this.logSrv.deleteSession(element.id).subscribe();
      });
    });
    }
    this.counter = 0;

    //If recording stop, stop all loops
    this.stopAll();
  }
  getCurrentLoopTime(): number{
    //Check the time where the loops are in
    return this.myPads.filter((item:PadComponent)=>
           item.padState)[0].playerRef.nativeElement.currentTime;
  }
  stopAll(){
    //For recording mode, save the activity
    if(this.isRecording){
      const temp = Date.now();
      const act: Activity = {id: uuid(), item: 'all',action: 'stop', time: temp-this.counter}
      this.counter = temp;
      this.logSrv.addActivity(act).subscribe();
    }

    //Stop all loops
    this.playing = false;
    this.myPads.forEach(element => {
      element.stop()
      //Show controls of pad if in ON state
      if(element.padState){
          element.player.controls = true;
          element.player.load();
      }
     })
  }
  playAll(){
    //For recording mode, save the activity
    if(this.isRecording){
      const temp = Date.now();
      const act: Activity = {id: uuid(), item: 'all',action: 'play', time: temp - this.counter}
      this.counter = temp;
      this.logSrv.addActivity(act).subscribe();
    }
    //Play all loops
    this.playing = true;
    this.myPads.forEach(element => element.play())
  }
}
