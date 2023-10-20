import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from './todo.service';
import { TodoModel } from './todo.model';
import { ResponseList } from 'src/app/core/model/response-list';
import { TodoGroupModel } from './todo-group.model';
import { ResponseObject } from 'src/app/core/model/response-object';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: TodoModel[];
  today: Date = new Date();

  selectedPkTodoGroup: string = '';
  newText: string = '';

  private service = inject(TodoService);

  constructor() {
    this.todos = [

      // {isCompleted: false, todo: '할일1'},
      // {isCompleted: false, todo: '할일2'}
    ];
  }

  ngOnInit() {

  }

  toggleTodo(todo: TodoModel) {
    console.log(todo);

    this.service
        .saveTodo(todo)
        .subscribe(
          (model: ResponseObject<TodoModel>) => {
            console.log(model);
          }
        )
  }

  addTodo(todo: TodoModel) {
    this.service
        .saveTodo(todo)
        .subscribe(
          (model: ResponseObject<TodoModel>) => {
            console.log(model);
            this.todos.push({
              pkTodoGroup : model.data.pkTodoGroup,
              pkTodo : model.data.pkTodo,
              isCompleted : model.data.isCompleted,
              todo : model.data.todo
            });
          }
        );
  }

  deleteTodo(todo: TodoModel) {
    this.service
        .deleteTodo(todo.pkTodoGroup, todo.pkTodo)
        .subscribe(
          (model: ResponseObject<TodoModel>) => {
            let index = this.todos.findIndex((e) => e.pkTodoGroup === todo.pkTodoGroup && e.pkTodo === todo.pkTodo);
            console.log(index);
            this.todos.splice(index, 1);
          }
        );
  }

  getTodoList(pkTodoGroup: string): void {
    this.selectedPkTodoGroup = pkTodoGroup;

    this.service
        .getTodoList(pkTodoGroup)
        .subscribe(
          (model: ResponseList<TodoModel>) => {
            console.log(model);
            this.todos = model.data;
          });
  }

  deleteTodoGroup(pkTodoGroup: string) {

    this.service
        .deleteTodoGroup(pkTodoGroup)
        .subscribe(
          (model: ResponseObject<TodoGroupModel>) => {

          }
        );
  }
}

