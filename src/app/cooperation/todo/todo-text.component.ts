import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoModel } from './todo.model';


@Component({
  standalone: true,
  selector: 'app-todo-text',
  imports: [ CommonModule, FormsModule, MatButtonModule, MatCheckboxModule, MatIconModule ],
  template: `
    <mat-checkbox [(ngModel)]="todo.isCompleted" (change)="changeState()"></mat-checkbox>
    <label (click)="toggleState()" [class.line-break]="todo.isCompleted"> {{ todo.todo }} </label>
    <button mat-icon-button color="warn" (click)="deleteTodo()"><mat-icon>delete</mat-icon></button>
  `,
  styles: [`

    :host {
      display: block;
      /*padding: 16px;*/
      color: darkgray;
      background-color: white;
    }
    /*
    input {
      position: relative;
    }

    input:before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 20px;
      position: absolute;
      top: -3px;
      left: -6px;
      border: 1px solid darkgray;
    }

    input:checked:after {
      content: '\\2713';
      display: inline-block;
      font-size: 12px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      position: absolute;
      top: -3px;
      left: -6px;
      border: 1px solid darkgray;
      backgroud-color: darkgray;
      text-align: center;
      color: red;
    }

    input:checked + label {
      text-decoration: line-through;
    }
*/
    .line-break {
      text-decoration: line-through;
    }
  `]
})
export class TodoTextComponent implements OnInit {

  @Input({required: true}) todo!: TodoModel;
  @Output() stateChanged = new EventEmitter();
  @Output() deleteClicked = new EventEmitter<TodoModel>();

  constructor() {}

  ngOnInit() {
  }

  changeState() {
    this.stateChanged.emit(this.todo);
  }

  toggleState() {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.stateChanged.emit(this.todo);
  }

  deleteTodo() {
    this.deleteClicked.emit(this.todo);
  }


}
