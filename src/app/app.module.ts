import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PadComponent } from './components/pad/pad.component';
import { HeaderComponent } from './components/header/header.component';
import { PadsComponent } from './components/pads/pads.component';

@NgModule({
  declarations: [
    AppComponent,
    PadComponent,
    HeaderComponent,
    PadsComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
