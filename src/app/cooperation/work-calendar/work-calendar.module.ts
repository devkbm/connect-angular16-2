import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { CalendarModule } from 'src/app/shared-component/calendar/calendar.module';

/* Inner Component */
import { WorkCalendarComponent } from './work-calendar.component';
import { WorkCalendarEventFormComponent } from './event/work-calendar-event-form.component';
import { WorkCalendarService } from './calendar/work-calendar.service';
import { WorkCalendarEventService } from './event/work-calendar-event.service';
import { WorkCalendarViewComponent } from './calendar-view/work-calendar-view.component';
import { MyWorkCalendarGridComponent } from './calendar/my-work-calendar-grid.component';
import { WorkCalendarFormComponent } from './calendar/work-calendar-form.component';
import { MyWorkCalendarListComponent } from './calendar/my-work-calendar-list.component';


@NgModule({
  imports: [
    CommonModule,
    NzDrawerModule,
    NzButtonModule,
    NzIconModule,

    CalendarModule,

    MyWorkCalendarListComponent,
    MyWorkCalendarGridComponent,
    WorkCalendarFormComponent,
    WorkCalendarViewComponent,
    WorkCalendarEventFormComponent
  ],
  declarations: [
    WorkCalendarComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    WorkCalendarService,
    WorkCalendarEventService
  ],
  exports: [
    WorkCalendarComponent
  ]
})
export class WorkCalendarModule { }
