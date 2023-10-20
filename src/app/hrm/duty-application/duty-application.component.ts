import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';

@Component({
  selector: 'app-duty-application',
  templateUrl: './duty-application.component.html',
  styleUrls: ['./duty-application.component.css']
})
export class DutyApplicationComponent extends AppBase implements OnInit, AfterViewInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }


}
