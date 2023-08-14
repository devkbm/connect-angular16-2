import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { DataService } from './data.service';

import { DaypilotCalendarComponent } from './daypilot-calendar.component';
import { DaypilotCalendarNavigatorComponent } from './daypilot-calendar-navigator.component';
import { DaypilotCalendarBasicComponent } from './daypilot-calendar-basic.component';

// npm i @daypilot/daypilot-lite-angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule
  ],
  declarations: [
    CalendarComponent,
    DaypilotCalendarComponent,
    DaypilotCalendarNavigatorComponent,
    DaypilotCalendarBasicComponent
  ],
  providers: [DataService],
  exports: [
    CalendarComponent,
    DaypilotCalendarComponent,
    DaypilotCalendarNavigatorComponent,
    DaypilotCalendarBasicComponent
  ]
})
export class CalendarModule { }
