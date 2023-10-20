import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CooperationRoutingModule } from './cooperation-routing.module';

import { BoardModule } from './board/board.module';
import { TeamModule } from './team/team.module';
import { TodoModule } from './todo/todo.module';
import { WorkCalendarModule } from './work-calendar/work-calendar.module';

@NgModule({
  imports: [
    CommonModule,
    CooperationRoutingModule,
    BoardModule,
    TeamModule,
    TodoModule,
    WorkCalendarModule
  ]
})
export class CooperationModule { }
