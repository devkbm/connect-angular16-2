import { Component, OnInit, ViewChild, inject } from '@angular/core';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';

import { TeamGridComponent } from './team-grid.component';
import { TeamModel } from './team.model';
import { TeamService } from './team.service';
import { Team } from '../communication/model/team';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @ViewChild(TeamGridComponent) grid!: TeamGridComponent;

  drawerTeamForm: { visible: boolean, initLoadId: number | null } = {
    visible: false,
    initLoadId: null
  }

  gridList: TeamModel[] = [];

  private appAlarmService = inject(AppAlarmService);
  private service = inject(TeamService);

  ngOnInit() {
    this.getGridList('');
  }

  newTeam() {
    this.drawerTeamForm.initLoadId = null;
    this.drawerTeamForm.visible = true;
  }

  editTeam(team: Team) {
    this.drawerTeamForm.initLoadId = team.teamId;
    this.drawerTeamForm.visible = true;
  }

  getGridList(typeId: string): void {
    this.drawerTeamForm.visible = false;

    const params = {
    //  typeId : typeId
    };

    this.service
        .getList(params)
        .subscribe(
          (model: ResponseList<TeamModel>) => {
            if (model.total > 0) {
              this.gridList = model.data;
            } else {
              this.gridList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

}
