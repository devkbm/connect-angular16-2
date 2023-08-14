import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoTextComponent } from './todo-text.component';
import { TodosComponent } from './todos.component';
import { TodoAddInputComponent } from './todo-add-input.component';
import { TodoGroupListComponent } from './todo-group-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoGroupListComponent,
    TodoAddInputComponent,
    TodoTextComponent
  ],
  declarations: [
    TodosComponent
  ],
  exports: [
    TodosComponent
  ]
})
export class TodoModule { }
